require('../Models/connectToDB')
const Subscriber = require('../Models/subscriber')
const Event = require('../Models/event')
const { userValidationEmail } = require('../Utils/validate')
const { ObjectId } = require('mongodb')
const getSubscribers = async (request, response) => {
    const field = request.query.field
    const order = request.query.order
    let nbLimit = request.query.nbLimit
    if (!nbLimit || !field || !order || (field !== "createdAt" && field !== "events") || (order !== "asc" && order !== "desc") || (Number(nbLimit) < 0))
        return response.status(403).json({ error: `Unauthorized: invalid search request` })
    nbLimit = Number(nbLimit)
    const subscribers = await Subscriber.find({}).sort({ [field]: order }).limit(nbLimit)
        .populate({ path: 'events', model: 'Event' })
    if (subscribers)
        response.json({ data: subscribers })
    else
        response.status(401).json({ error: 'No result found' })
}
const getSubscribersForEvent = async (eventId) => {
    const subscribers = await Subscriber.find({ events: ObjectId(eventId) })
    if (!subscribers)
        return false
    return subscribers
}
const subscribeToEvent = async (request, response, next) => {
    const body = request.body
    console.log("body", body)
    const _id = request.params
    if (Number(_id.id.trim().length) !== 24)
        return next({ name: "CastError", message: 'Event ID not valid' })
    const validate = userValidationEmail(body)
    if (validate.error)
        return next({ name: "ValidationError", message: validate.error.message })
    try {
        const testId = ObjectId(_id.id.trim())
    } catch (err) {
        return next({ name: "CastError", message: 'Event ID not valid' })
    }
    const event = await Event.findById(ObjectId(_id.id.trim()))
    console.log("event", event)
    if (event === null)
        return next({ name: "ValidationError", message: 'Event data not existed' })
    const checkSubscriber = await Subscriber.find({ email: body.email })
    if (!checkSubscriber.length) {
        const newSubscriber = new Subscriber({
            email: body.email,
            events: ObjectId(event.id)
        })
        const savedSubscriber = await newSubscriber.save()
        event.subscribers.push(ObjectId(savedSubscriber._id))
        await Event.findByIdAndUpdate(ObjectId(_id), event)
        response.status(201).json({ data: savedSubscriber })
    }
    else {
        const checkIfExist = await Event.find({ _id: _id.id.trim(), subscribers: checkSubscriber[0].id })
        console.log("checkIfExist", checkIfExist)
        if (checkIfExist.length)
            return next({ name: "Corrupted", message: `You're already subscribe to this event!` })
        event.subscribers.push(ObjectId(checkSubscriber[0]._id))
        checkSubscriber[0].events.push(ObjectId(event.id))
        await Event.findByIdAndUpdate(ObjectId(_id), event)
        const newSubscriber = await Subscriber.findByIdAndUpdate(ObjectId(checkSubscriber[0]._id), checkSubscriber[0], { new: true })
        response.status(201).json({ data: newSubscriber })
    }
}
const unscribeToEvent = async (request, response, next) => {
    const body = request.body
    const _id = request.params
    if (Number(_id.id.length) !== 24)
        return next({ name: "CastError", message: 'Event ID not valid' })
    const validate = userValidationEmail(body)
    if (validate.error)
        return next({ name: "ValidationError", message: validate.error.message })
    try {
        const testId = ObjectId(_id.id.trim())
    } catch (err) {
        return next({ name: "CastError", message: 'Event ID not valid' })
    }
    const event = await Event.findById(ObjectId(_id))
    if (event === null)
        return next({ name: "ValidationError", message: 'Event data not existed' })
    const checkSubscriber = await Subscriber.find({ email: body.email })
    if (!checkSubscriber.length)
        return next({ name: "ValidationError", message: 'Email data not existed' })
    const R1 = await Event.findByIdAndUpdate(event.id, {
        $pullAll: {
            subscribers: [checkSubscriber[0]._id],
        },
    })
    const R2 = await Subscriber.findByIdAndUpdate(checkSubscriber[0]._id, {
        $pullAll: {
            events: [ObjectId(event.id)],
        },
    }, { new: true })
    if (!(R1 && R2))
        return next({ name: "ValidationError", message: 'Email data not removed' })
    response.status(201).json({ data: R2 })
}
module.exports = { getSubscribers, subscribeToEvent, unscribeToEvent, getSubscribersForEvent }