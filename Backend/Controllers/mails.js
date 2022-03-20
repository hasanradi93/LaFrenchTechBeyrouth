require('../Models/connectToDB')
const Mails = require('../Models/mails')
const { ObjectId } = require('mongodb')
const mailsForEvent = async (eventId, subscribers) => {
    console.log("eventId", eventId)
    console.log("subscribers", subscribers)
    const newMails = new Mails({
        eventId: eventId,
        subscribers: subscribers
    })
    const savedMailsSent = await newMails.save()
    console.log("savedMailsSent", savedMailsSent)
}
const getMailsData = async (request, response, next) => {
    const mails = await Mails.find({}).limit(15)
        .populate({ path: 'eventId', model: 'Event' })
        .populate({ path: 'subscribers', model: 'Subscriber' })
        .sort({ $natural: -1 })
        .limit(10)
    console.log("mails", mails)
    if (!mails.length)
        return next({ name: "Corrupted", message: `No mails sent data` })
    response.status(201).json({ data: mails })
}
module.exports = { mailsForEvent, getMailsData }