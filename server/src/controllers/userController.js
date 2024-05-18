const { hashedPassword } = require('../helpers');
const UserModel = require('../models/userModel');
const asyncErrorHandler = require('express-async-handler');

const { uploadImage } = require('../helpers');

const GetAllUsers = asyncErrorHandler(async (req, res) => {
    const users = await UserModel.find({}).select('email fullName imageURL id username');
    res.status(200).json({
        status: 'success',
        message: 'All users fetched successfully!',
        count: users.length,
        data: users,
    });
});

const GetUserById = asyncErrorHandler(async (req, res) => {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if (!user) {
        res.status(404);
        throw new Error('User not found!');
    }
    return res.status(200).json({
        status: 'success',
        message: 'User fetched successfully!',
        data: user,
    });
});

const UpdateUser = asyncErrorHandler(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    if (id && data) {
        const user = await UserModel.findById(id);
        if (!user) {
            res.status(404);
            throw new Error('User not found!');
        }
        if (data.password) {
            data.password = hashedPassword(data.password);
        }
        const updatedUser = await UserModel.findByIdAndUpdate(id, data, { new: true });
        return res.status(200).json({
            status: 'success',
            message: 'User updated successfully!',
            data: updatedUser,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user id or data!');
    }
});

const UploadAvatar = asyncErrorHandler(async (req, res) => {
    if (req.file && req.params.id) {
        const imageURL = await uploadImage(req.file, 'file');
        const user = await UserModel.findByIdAndUpdate(req.params.id, { imageURL }, { new: true });

        res.status(200).json({
            status: 'success',
            message: 'Avatar uploaded successfully!',
            data: user,
        });
    } else {
        res.status(400);
        throw new Error('Invalid file or user id!');
    }
});

module.exports = {
    UpdateUser,
    GetAllUsers,
    GetUserById,
    UploadAvatar,
};
