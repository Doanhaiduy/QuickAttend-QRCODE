const express = require('express');
const {
    GetAllEvents,
    AddNewEvent,
    GetEventById,
    GetEventByAuthorId,
    UpdateEvent,
    DeleteEvent,
    GetQRCodeById,
    GetAnalyticEvent,
    GetEventByCode,
} = require('../controllers/eventController');
const Router = express.Router();

Router.get('/get-all', GetAllEvents);
Router.get('/get-analytic', GetAnalyticEvent);
Router.get('/:id', GetEventById);
Router.get('/author/:authorId', GetEventByAuthorId);
Router.get('/eventCode/:eventCode', GetEventByCode);
Router.get('/qrCode/:id', GetQRCodeById);
Router.post('/create', AddNewEvent);
Router.put('/:id', UpdateEvent);
Router.delete('/:id', DeleteEvent);

module.exports = Router;
