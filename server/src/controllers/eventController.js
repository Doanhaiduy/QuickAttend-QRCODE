const asyncErrorHandler = require('express-async-handler');
const EventModel = require('../models/eventModel');
var QRCode = require('qrcode');
const { uploadImage, encryptData, decryptData, checkTimeStatus } = require('../helpers');
const mongoose = require('mongoose');

const handleCreateQrCode = async (data) => {
    if (data) {
        try {
            const jsonData = JSON.stringify(data);
            const encryptedData = encryptData(jsonData, process.env.ENCRYPT_KEY);
            const decryptedData = decryptData(encryptedData, process.env.ENCRYPT_KEY);
            console.log('Decrypted data:', decryptedData);
            let qr = await QRCode.toDataURL(
                JSON.stringify({ data: encryptedData, message: 'https://doanhaiduy.website' }),
                {
                    errorCorrectionLevel: 'H',
                    margin: 1,
                    color: {
                        dark: '#000000',
                        light: '#ffffff',
                    },
                }
            );

            const url = await uploadImage(qr, 'data_url');
            return url;
        } catch (error) {
            throw new Error(error);
        }
    }
};

const AddNewEvent = asyncErrorHandler(async (req, res) => {
    const eventCode = Math.random().toString(36).substring(7).toUpperCase();
    req.body.eventCode = eventCode;
    const data = req.body;
    const QRCodeUrl = await handleCreateQrCode(data);
    req.body.QRCodeUrl = QRCodeUrl;

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
    const { status } = req.query;
    let events = await EventModel.find().sort({ startAt: -1 });

    if (status === 'Upcoming' || status === 'Ongoing' || status === 'Expired') {
        events = events.filter((event) => {
            const eventStatus = checkTimeStatus(event.startAt, event.endAt);
            return eventStatus === status;
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'Events fetched successfully!',
        count: events.length,
        data: events,
    });
});

const GetAnalyticEvent = asyncErrorHandler(async (req, res) => {
    const currentTime = new Date();

    const total = await EventModel.countDocuments();

    const upcoming = await EventModel.countDocuments({ startAt: { $gt: currentTime } });

    const ongoing = await EventModel.countDocuments({ startAt: { $lte: currentTime }, endAt: { $gte: currentTime } });

    const expired = await EventModel.countDocuments({ endAt: { $lt: currentTime } });

    const analytic = {
        total,
        upcoming,
        ongoing,
        expired,
    };

    res.json({
        status: 'success',
        message: 'Analytic fetched successfully!',
        data: analytic,
    });
});

const GetEventByAuthorId = asyncErrorHandler(async (req, res) => {
    const authorId = req.params.authorId;
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
        res.status(400);
        throw new Error('Invalid author ID');
    }
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid event ID');
    }
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

const GetEventByCode = asyncErrorHandler(async (req, res) => {
    const eventCode = req.params.eventCode;

    const event = await EventModel.findOne({ eventCode: eventCode.toUpperCase() });
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid id');
    }
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid event id');
    }
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

const GetQRCodeById = asyncErrorHandler(async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid event id');
    }
    if (id) {
        const event = await EventModel.findById(id);
        if (!event) {
            res.status(404);
            throw new Error('Event not found!');
        }
        res.status(200).json({
            status: 'success',
            message: 'QR code fetched successfully!',
            data: event.QRCodeUrl,
        });
    } else {
        res.status(404);
        throw new Error('Invalid id');
    }
});

module.exports = {
    AddNewEvent,
    GetAllEvents,
    GetEventByAuthorId,
    GetEventById,
    UpdateEvent,
    DeleteEvent,
    GetQRCodeById,
    GetAnalyticEvent,
    GetEventByCode,
};
