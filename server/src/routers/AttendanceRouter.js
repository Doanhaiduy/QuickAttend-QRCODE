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
Router.get('/:id', GetAttendanceId);
Router.get('/user/:id', GetAttendanceByUserId);
Router.get('/event/:eventCode/user/:userId', CheckUserAttendance);
Router.post('/create', CreateAttendance);

module.exports = Router;
