const asyncErrorHandler = require('express-async-handler');
const EventModel = require('../models/eventModel');

const AddNewEvent = asyncErrorHandler(async (req, res) => {
    const data = req.body;
    console.log(data);
    if (data) {
        const event = new EventModel(data);
        await event.save();
        res.status(201).json({
            status: 'success',
            message: 'Event created successfully',
            data: event,
        });
    } else {
        res.status(400);
        throw new Error('Invalid data');
    }
});

const GetAllEvents = asyncErrorHandler(async (req, res) => {
    const events = await EventModel.find({});
    res.status(200).json({
        status: 'success',
        message: 'All events fetched successfully!',
        count: events.length,
        data: events,
    });
});

const GetEventByAuthorId = asyncErrorHandler(async (req, res) => {
    const authorId = req.params.authorId;
    const events = await EventModel.find({ authorId });
    res.status(200).json({
        status: 'success',
        message: 'Events fetched successfully!',
        count: events.length,
        data: events,
    });
});

const GetEventById = asyncErrorHandler(async (req, res) => {
    const id = req.params.id;
    const event = await EventModel.findById(id);
    if (!event) {
        res.status(404);
        throw new Error('Event not found!');
    }
    res.status(200).json({
        status: 'success',
        message: 'Event fetched successfully!',
        data: event,
    });
});

const UpdateEvent = asyncErrorHandler(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    if (id && data) {
        const event = await EventModel.findById(id);
        if (!event) {
            res.status(404);
            throw new Error('Event not found!');
        }
        const updatedEvent = await EventModel.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json({
            status: 'success',
            message: 'Event updated successfully!',
            data: updatedEvent,
        });
    }
});

const DeleteEvent = asyncErrorHandler(async (req, res) => {
    const id = req.params.id;
    if (id) {
        const event = await EventModel.findById(id);
        if (!event) {
            res.status(404);
            throw new Error('Event not found!');
        }
        await EventModel.findByIdAndDelete(id);
        res.status(200).json({
            status: 'success',
            message: 'Event deleted successfully!',
        });
    }
});

module.exports = {
    AddNewEvent,
    GetAllEvents,
    GetEventByAuthorId,
    GetEventById,
    UpdateEvent,
    DeleteEvent,
};
