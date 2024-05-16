const { hashedPassword } = require('../helpers');
const UserModel = require('../models/userModel');
const asyncErrorHandler = require('express-async-handler');

const GetAllUsers = asyncErrorHandler(async (req, res) => {
    const users = await UserModel.find({});
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
        return res.status(404).json({
            status: 'error',
            message: 'User not found!',
        });
    }
    res.status(200).json({
        status: 'success',
        message: 'User fetched successfully!',
        data: user,
    });
});

const UpdateUser = asyncErrorHandler(async (req, res) => {
    const id = req.params.id;
    const { fullName, email, password, imageURL } = req.body;
    const user = await UserModel.findById(id);

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found!',
        });
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.imageURL = imageURL || user.imageURL;
    user.password = password ? await hashedPassword(password) : user.password;
    await user.save();
    res.status(200).json({
        status: 'success',
        message: 'User updated successfully!',
        data: user,
    });
});

module.exports = {
    UpdateUser,
    GetAllUsers,
    GetUserById,
};
