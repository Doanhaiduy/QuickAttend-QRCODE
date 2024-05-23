const express = require('express');
const {
    GetAttendanceByEventId,
    GetAttendanceId,
    CreateAttendance,
    GetAttendanceByUserId,
    CheckUserAttendance,
} = require('../controllers/AttendanceController');
const Router = express.Router();

Router.get('/event/:id', GetAttendanceByEventId);
Router.get('/event/:eventCode/user/:userId', CheckUserAttendance);
Router.get('/user/:id', GetAttendanceByUserId);
Router.get('/:id', GetAttendanceId);
Router.post('/create', CreateAttendance);

module.exports = Router;
