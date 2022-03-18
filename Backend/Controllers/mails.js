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
const getMailsData = async (request, response) => {
    const mails = await Mails.find({})
        .populate({ path: eventId, model: 'Event' })
        .populate({ path: 'subscribers', model: 'Subscriber' })
        .sort({ $natural: -1 })
        .limit(10)
    if (!mails.length)
        return next({ name: "Corrupted", message: `No data` })
    response.status(201).json({ data: mails })
}
module.exports = { mailsForEvent, getMailsData }