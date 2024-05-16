const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
        default: Date.now,
    },
    location: {
        type: String,
        required: true,
    },
    locationName: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    privateCode: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    QRCodeUrl: {
        type: String,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
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
