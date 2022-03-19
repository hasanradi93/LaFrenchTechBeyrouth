require('../Models/connectToDB')
const Subscriber = require('../Models/subscriber')
const Event = require('../Models/event')
const { userValidationEmail } = require('../Utils/validate')
const { sendSubscriptionDone } = require('../Utils/sendEmail')
const { ObjectId } = require('mongodb')
const getSubscribers = async (request, response, next) => {
    if (request.user === undefined || request.user.userType !== 1)
        return next({ name: "UnAuthorizedError", message: `You don't have credentials` })
    const subscribers = await Subscriber.find({})
        .populate({ path: 'events', model: 'Event' })
    if (subscribers)
        response.json({ data: subscribers })
    else
        return next({ name: "Oops", message: `No subscriber found` })
}
const searchSubscribers = async (request, response, next) => {
    if (request.user === undefined || request.user.userType !== 1)
        return next({ name: "UnAuthorizedError", message: `You don't have credentials` })
    const field = request.query.field
    const order = request.query.order
    let nbLimit = request.query.nbLimit
    if (!nbLimit || !field || !order || (field !== "createdAt" && field !== "events") || (order !== "asc" && order !== "desc") || (Number(nbLimit) < 0))
        return next({ name: "Corrupted", message: `Unauthorized: invalid search request` })
    nbLimit = Number(nbLimit)
    const subscribers = await Subscriber.find({}).sort({ [field]: order }).limit(nbLimit)
        .populate({ path: 'events', model: 'Event' })
    if (subscribers)
        response.json({ data: subscribers })
    else
        return next({ name: "Oops", message: `No subscriber found` })
}
const getSubscribersForEvent = async (eventId) => {
    console.log("eventIdGet", eventId)
    const subscribers = await Subscriber.find({ events: ObjectId(eventId) })
    console.log("subscribersGET", subscribers)
    if (!subscribers)
        return false
    return subscribers
}
const subscribeToEvent = async (request, response, next) => {
    const body = request.body
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
        sendSubscriptionDone(event, body.email)
        response.status(201).json({ data: savedSubscriber })
    }
    else {
        const checkIfExist = await Event.find({ _id: _id.id.trim(), subscribers: checkSubscriber[0].id })
        if (checkIfExist.length)
            return next({ name: "Oops", message: `You're already subscribe to this event!` })
        event.subscribers.push(ObjectId(checkSubscriber[0]._id))
        checkSubscriber[0].events.push(ObjectId(event.id))
        await Event.findByIdAndUpdate(ObjectId(_id), event)
        const newSubscriber = await Subscriber.findByIdAndUpdate(ObjectId(checkSubscriber[0]._id), checkSubscriber[0], { new: true })
        sendSubscriptionDone(event, body.email)
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
module.exports = { getSubscribersForEvent, getSubscribers, searchSubscribers, subscribeToEvent, unscribeToEvent }