const express = require('express');
const { GetAllEvents, AddNewEvent, GetEventById, GetEventByAuthorId } = require('../controllers/eventController');
const Router = express.Router();

Router.get('/get-all', GetAllEvents);
Router.get('/:id', GetEventById);
Router.get('/author/:authorId', GetEventByAuthorId);
Router.post('/create', AddNewEvent);

module.exports = Router;
