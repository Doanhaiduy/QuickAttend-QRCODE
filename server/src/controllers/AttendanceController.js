const asyncErrorHandler = require('express-async-handler');
const AttendanceModel = require('../models/AttendanceModel');
const mongoose = require('mongoose');
const EventModel = require('../models/eventModel');
const UserModel = require('../models/userModel');

const GetAttendanceByEventId = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid event ID');
    }
    const attendance = await AttendanceModel.find({
        eventId: id,
    });
    res.status(200).json({
        status: 'success',
        message: 'Get attendance by event id',
        count: attendance.length,
        data: attendance,
    });
});

const GetAttendanceId = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid Attendance ID');
    }
    const attendance = await AttendanceModel.findById(id);
    if (!attendance) {
        res.status(404);
        throw new Error('Attendance not found!');
    }
    res.status(200).json({
        status: 'success',
        message: 'Get attendance by id',
        data: attendance,
    });
});

const CreateAttendance = asyncErrorHandler(async (req, res) => {
    const { eventCode, userId, status, attendanceTime, location, locationName } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400);
        throw new Error('Invalid user ID');
    }

    const event = await EventModel.findOne({ eventCode: eventCode.toUpperCase() });
    const user = await UserModel.findById(userId);
    if (!event) {
        res.status(404);
        throw new Error('Event not found!');
    }
    if (!user) {
        res.status(404);
        throw new Error('User not found!');
    }
    console.log(user);

    const attendance = new AttendanceModel({
        eventId: event._id,
        userId,
        userFullName: user.fullName,
        status,
        attendanceTime,
        location,
        locationName,
    });

    const newAttendance = await attendance.save();
    res.status(200).json({
        status: 'success',
        message: 'Attendance created successfully!',
        data: newAttendance,
    });
});

const CheckUserAttendance = asyncErrorHandler(async (req, res) => {
    const { eventCode, userId } = req.params;
    const event = await EventModel.findOne({ eventCode: eventCode.toUpperCase() });

    if (!event) {
        res.status(404);
        throw new Error('Event not found!');
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400);
        throw new Error('Invalid user ID');
    }

    const attendance = await AttendanceModel.findOne({ eventId: event._id, userId });

    if (!attendance) {
        res.status(200).json({
            hasAttendance: false,
        });
    }

    res.status(200).json({
        hasAttendance: true,
        attendance,
    });
});

const GetAttendanceByUserId = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid user ID');
    }
    const attendance = await AttendanceModel.find({
        userId: id,
    });
    res.status(200).json({
        status: 'success',
        message: 'Get attendance by user id',
        count: attendance.length,
        data: attendance,
    });
});

module.exports = {
    GetAttendanceByEventId,
    GetAttendanceId,
    CreateAttendance,
    CheckUserAttendance,
    GetAttendanceByUserId,
};
