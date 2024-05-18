const express = require('express');
const {
    GetAllEvents,
    AddNewEvent,
    GetEventById,
    GetEventByAuthorId,
    UpdateEvent,
    DeleteEvent,
} = require('../controllers/eventController');

const Router = express.Router();

Router.get('/get-all', GetAllEvents);
Router.get('/:id', GetEventById);
Router.get('/author/:authorId', GetEventByAuthorId);
Router.post('/create', AddNewEvent);
Router.put('/:id', UpdateEvent);
Router.delete('/:id', DeleteEvent);
Router.post('/qrCode');

module.exports = Router;
