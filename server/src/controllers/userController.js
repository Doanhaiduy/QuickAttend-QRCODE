const { getJwtToken, hashedPassword } = require('../helpers');
const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    const exitingUser = await UserModel.findOne({
        email,
    });
    if (!exitingUser) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found!',
        });
    }

    const isMatch = await bcrypt.compare(password, exitingUser.password);

    if (!isMatch) {
        return res.status(401).json({
            status: 'error',
            message: 'Email or password is incorrect!',
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        data: {
            fullName: exitingUser.fullName,
            email: exitingUser.email,
            id: exitingUser._id,
            accessToken: await getJwtToken(exitingUser.email, exitingUser._id),
        },
    });
};

const RegisterUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    const exitingUser = await UserModel.findOne({ email });
    if (exitingUser) {
        return res.status(401).json({
            status: 'error',
            message: 'User already exists!',
        });
    }

    const newHashedPassword = await hashedPassword(password);
    try {
        const User = new UserModel({
            fullName,
            email,
            password: newHashedPassword,
        });
        await User.save();
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: {
                fullName: User.fullName,
                email: User.email,
                id: User._id,
                accessToken: await getJwtToken(User.email, User._id),
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

const ForgotPassword = async (req, res) => {};

const Verification = async (req, res) => {};

const ResetPassword = async (req, res) => {};

const GetUserProfile = async (req, res) => {};

const UpdateUser = async (req, res) => {};

const GetAllUsers = async (req, res) => {};

const GetUserById = async (req, res) => {};

module.exports = {
    LoginUser,
    RegisterUser,
    GetUserProfile,
    UpdateUser,
    GetAllUsers,
    GetUserById,
    ForgotPassword,
    Verification,
    ResetPassword,
};
