require('../Models/connectToDB')
const Event = require('../Models/event')
const { eventValidation, photoValidation } = require('../Utils/validate')
const { uploadPhoto, deletePhoto } = require('../Utils/uploadFile')
const { sendAMailEvent } = require('../Utils/sendEmail')
const { ObjectId } = require('mongodb')
const logger = require('../Utils/logger')
const getLatestEventsVisitor = async (request, response) => {
    const events = await Event.find({ 'deleted.status': false, 'active': true, endDate: { $lte: new Date().toISOString().substring(0, 10) } }).limit(3)
        .populate({ path: 'subscribers', model: 'Subscriber' })
        .sort({ $natural: -1 })
    response.status(201).json({ data: events })
}
const getEventsAvailableVisitor = async (request, response) => {
    const events = await Event.find({ 'deleted.status': false, 'active': true, availableFromDate: { $lte: new Date().toISOString().substring(0, 10) }, availableToDate: { $gte: new Date().toISOString().substring(0, 10) } })
        .populate({ path: 'subscribers', model: 'Subscriber' })
        .sort({ $natural: -1 })
    response.status(201).json({ data: events })
}
const getEventsAvailableAdmin = async (request, response, next) => {
    if (request.user === undefined)
        return next({ name: "UnAuthorizedError", message: `You don't have credentials` })
    const events = await Event.find({ 'deleted.status': false, endDate: { $gte: new Date().toISOString().substring(0, 10) } })
        .populate({ path: 'subscribers', model: 'Subscriber' })
        .sort({ $natural: -1 })
    response.status(201).json({ data: events })
}
const getEventsChart = async (request, response, next) => {
    if (request.user === undefined)
        return next({ name: "UnAuthorizedError", message: `You don't have credentials` })
    const events = await Event.find({ 'deleted.status': false, endDate: { $gte: new Date().toISOString().substring(0, 10) } })
        .populate({ path: 'subscribers', model: 'Subscriber' })
        .sort({ $natural: -1 })
        .limit(10)
    response.status(201).json({ data: events })
}
const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate()
}
const getEventsSearch = async (request, response, next) => {
    if (request.user === undefined)
        return next({ name: "UnAuthorizedError", message: `You don't have credentials` })
    const typeSearch = request.query.type
    let nbLimit = request.query.nbLimit
    if (!typeSearch || !nbLimit || Number(nbLimit) < 0)
        return next({ name: "Corrupted", message: `invalid search request` })
    nbLimit = Number(nbLimit)
    if (Number(typeSearch) === 1) {
        const month = request.query.month
        const year = request.query.year
        if (!month || !year || month < 1 || month > 12 || year > (new Date().getFullYear()))
            return next({ name: "Corrupted", message: `invalid search request` })
        const days = daysInMonth(month, year)
        let date1 = year + '-' + month + '-' + '01'
        date1 = new Date(date1).toISOString().substring(0, 10)
        let date2 = year + '-' + month + '-' + days
        date2 = new Date(date2).toISOString().substring(0, 10)
        const events = await Event.find({ 'deleted.status': false, startDate: { $gte: date1, $lte: date2 } }).limit(nbLimit)
            .populate({ path: 'subscribers', model: 'Subscriber' })
            .sort({ $natural: -1 })
        if (!events.length)
            return next({ name: "Corrupted", message: `No data` })
        response.status(201).json({ data: events })
    }
    else if (Number(typeSearch) === 2) {
        const title = request.query.title
        const events = await Event.find({ 'deleted.status': false, title: new RegExp(title, 'i') }).limit(nbLimit)
            .populate({ path: 'subscribers', model: 'Subscriber' })
        if (!events.length)
            return next({ name: "Corrupted", message: `No data` })
        response.status(201).json({ data: events })
    }
    else if (Number(typeSearch) === 3) {
        const address = request.query.address
        const events = await Event.find({ 'deleted.status': false, address: new RegExp(address, 'i') }).limit(nbLimit)
            .populate({ path: 'subscribers', model: 'Subscriber' })
        if (!events.length)
            return next({ name: "Corrupted", message: `No data` })
        response.status(201).json({ data: events })
    }
    else if (Number(typeSearch) === 4) {
        const field = request.query.field
        const order = request.query.order
        const events = await Event.find({ 'deleted.status': false }).sort({ [field]: order }).limit(nbLimit)
            .populate({ path: 'subscribers', model: 'Subscriber' })
        if (!events.length)
            return next({ name: "Corrupted", message: `No data` })
        response.status(201).json({ data: events })
    }
    else if (Number(typeSearch) === 5) {
        const field = request.query.field
        const forType = request.query.forType
        let bool = true
        if (Number(forType) === 2)
            bool = false
        console.log("bool", bool)
        const events = await Event.find({ 'deleted.status': false, [field]: bool }).sort({ $natural: -1 }).limit(nbLimit)
            .populate({ path: 'subscribers', model: 'Subscriber' })
        if (!events.length)
            return next({ name: "Corrupted", message: `No data` })
        response.status(201).json({ data: events })
    }
}
const uploadPhotosEvent = uploadPhoto.array('photos')
const setEvent = async (request, response, next) => {
    if (request.user === undefined || request.user.userType !== 1)
        return next({ name: "UnAuthorizedError", message: `You don't have credentials` })
    const body = request.body
    body.location = JSON.parse(body.location)
    const validateEvent = eventValidation(body)
    if (validateEvent.error)
        return response.status(401).json({ error: validateEvent.error.message })
    if (request.files === undefined)
        return next({ name: "ValidationError", message: `Photos for event is required` })
    if (!request.files.length)
        return next({ name: "ValidationError", message: `Only .png, .jpg and .jpeg format allowed!` })
    const url = request.protocol + '://' + request.get('Host')
    let validatePhoto = ''
    let collectPhotos = []
    request.files.forEach(element => {
        validatePhoto = photoValidation({ photo: element })
        if (validatePhoto.error)
            return next({ name: "ValidationError", message: validatePhoto.error.message })
        collectPhotos.push(url + '/Files/Events/' + element.filename)
    })
    if (collectPhotos.length !== request.files.length)
        return next({ name: "ValidationError", message: `Check the photos` })
    const newEvent = new Event({
        title: body.title,
        description: body.description,
        photos: collectPhotos,
        active: body.active,
        availableFromDate: new Date(body.availableFromDate),
        availableToDate: new Date(body.availableToDate),
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        address: body.address,
        location: body.location,
        addedBy: request.user.id,
        deleted: { "status": false, "deletedBy": null }
    })
    const savedEvent = await newEvent.save()
    sendAMailEvent(savedEvent)
    response.status(201).json({ data: savedEvent })
}
const editEvent = async (request, response, next) => {
    if (request.user === undefined || request.user.userType !== 1)
        return next({ name: "UnAuthorizedError", message: `You don't have credentials` })
    const body = request.body
    body.location = JSON.parse(body.location)
    const _id = request.params
    const validate = eventValidation({
        "title": body.title,
        "description": body.description,
        "active": body.active,
        "availableFromDate": body.availableFromDate,
        "availableToDate": body.availableToDate,
        "startDate": body.startDate,
        "endDate": body.endDate,
        "address": body.address,
        "location": body.location
    })
    if (validate.error)
        return next({ name: "ValidationError", message: validate.error.message })
    const url = request.protocol + '://' + request.get('Host')
    let editedEvent = {
        title: body.title,
        description: body.description,
        active: body.active,
        availableFromDate: new Date(body.availableFromDate),
        availableToDate: new Date(body.availableToDate),
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        address: body.address,
        location: body.location,
        addedBy: request.user.id,
        deleted: { "status": false, "deletedBy": null }
    }
    if (request.files.length) {
        let validatePhoto = ''
        let collectPhotos = []
        request.files.forEach(element => {
            validatePhoto = photoValidation({ photo: element })
            if (validatePhoto.error)
                return next({ name: "ValidationError", message: validate.error.message })
            collectPhotos.push(url + '/Files/Events/' + element.filename)
        })
        if (collectPhotos.length !== request.files.length)
            return next({ name: "ValidationError", message: 'Check the photos' })
        const theEvent = await Event.findById(ObjectId(_id))
        for (let i = 0; i < theEvent.photos.length; i++) {
            collectPhotos.push(theEvent.photos[i])
        }
        editedEvent["photos"] = collectPhotos
    }
    const updatedEvent = await Event.findByIdAndUpdate(ObjectId(_id), editedEvent, { new: true })
    response.status(201).json({ data: updatedEvent })
}
const deletePhotoEvent = async (request, response, next) => {
    if (request.user === undefined || request.user.userType !== 1)
        return next({ name: "UnAuthorizedError", message: `You don't have credentials` })
    const _id = request.params
    const event = await Event.findById(ObjectId(_id))
    let eventArrPhotos = event.photos.filter(ph => (ph !== request.body.photo))
    event["photos"] = eventArrPhotos
    deletePhoto('/Files/Events', request.body.photo.split('Events')[1])
    const updatedEvent = await Event.findByIdAndUpdate(ObjectId(_id), event, { new: true })
    response.status(204).end()
}
const deleteEvent = async (request, response, next) => {
    if (request.user === undefined || request.user.userType !== 1)
        return next({ name: "UnAuthorizedError", message: `You don't have credentials` })
    const _id = request.params
    const event = await Event.findById(ObjectId(_id))
    if (event.subscribers.length)
        return next({ name: "UnAuthorizedError", message: `You can't delete event has subscribers` })
    event.deleted = { status: true, deletedBy: request.user.id }
    const deleteEvent = await Event.findByIdAndUpdate(ObjectId(_id), event, { new: true })
    event.photos.forEach(element => {
        deletePhoto('/Files/Events', element.split('Events')[1])
    })
    if (!deleteEvent)
        return next({ name: "CastError", message: `Error happening!, Event not deleted` })
    response.status(204).end()
}
module.exports = { getLatestEventsVisitor, getEventsAvailableVisitor, getEventsAvailableAdmin, getEventsChart, getEventsSearch, uploadPhotosEvent, setEvent, editEvent, deletePhotoEvent, deleteEvent }