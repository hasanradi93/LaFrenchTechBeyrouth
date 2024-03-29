const mongoose = require('mongoose')
const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 6,
        maxLength: 255
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }]
}, { timestamps: true })
subscriberSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Subscriber', subscriberSchema)