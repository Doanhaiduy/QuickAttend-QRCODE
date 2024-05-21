const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Event ID is required'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
    userFullName: {
        type: String,
        required: [true, 'User full name is required'],
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        default: 'pending',
    },
    attendanceTime: {
        type: Date,
        required: [true, 'Attendance time is required'],
        default: Date.now,
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

const AttendanceModel = mongoose.model('Attendance', Schema);
module.exports = AttendanceModel;
