const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    eventName: {
        type: String,
        required: [true, 'Event name is required'],
    },
    eventCode: {
        type: String,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    location: {
        latitude: {
            type: Number,
            required: [true, 'Latitude is required'],
        },
        longitude: {
            type: Number,
            required: [true, 'Longitude is required'],
        },
    },
    locationName: {
        type: String,
        required: [true, 'Location name is required'],
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
    },
    privateCode: {
        type: String,
        validate: {
            validator: function (value) {
                if (this.type === 'private') {
                    return value != null && value.trim().length > 0;
                }
                return true;
            },
            message: 'Private code is required when type is private',
        },
    },
    distanceLimit: {
        type: Number,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required'],
    },
    QRCodeUrl: {
        type: String,
    },
    startAt: {
        type: Date,
        required: [true, 'Start time is required'],
    },
    endAt: {
        type: Date,
        required: [true, 'End time is required'],
        default: Date.now,
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const EventModel = mongoose.model('Event', Schema);
module.exports = EventModel;
