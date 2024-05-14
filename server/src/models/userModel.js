const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
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

const UserModel = mongoose.model('User', Schema);
module.exports = UserModel;
