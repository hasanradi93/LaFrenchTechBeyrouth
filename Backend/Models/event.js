const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photos: [{
        type: String,
        required: true
    }],
    active: {
        type: Boolean,
        default: false
    },
    availableFromDate: {
        type: Date,
        required: true
    },
    availableToDate: {
        type: Date,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        X: {
            type: Number,
            required: true
        },
        Y: {
            type: Number,
            required: true
        }
    },
    subscribers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subscriber"
        }
    ],
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deleted: {
        status: Boolean,
        deletedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
}, { timestamps: true })
eventSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Event', eventSchema)