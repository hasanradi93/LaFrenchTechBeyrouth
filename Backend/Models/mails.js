const mongoose = require('mongoose')
const mailSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    subscribers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscriber"
    }]
}, { timestamps: true })
mailSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Mails', mailSchema)