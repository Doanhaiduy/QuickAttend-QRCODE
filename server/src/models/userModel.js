const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'FullName is required!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: [true, 'Email is already exists!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
    },
    username: {
        type: String,
        required: true,
        unique: [true, 'Username is already exists!'],
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    imageURL: {
        type: String,
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
