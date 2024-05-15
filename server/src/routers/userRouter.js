const express = require('express');
const {
    LoginUser,
    RegisterUser,
    ForgotPassword,
    Verification,
    ResetPassword,
    GetAllUsers,
    UpdateUser,
    GetUserById,
} = require('../controllers/userController');
const Router = express.Router();

Router.get('/', GetAllUsers);
Router.post('/auth/login', LoginUser);
Router.post('/auth/register', RegisterUser);
Router.post('/auth/forgotPassword', ForgotPassword);
Router.post('/auth/verification', Verification);
Router.post('/auth/resetPassword', ResetPassword);
Router.put('/:id', UpdateUser);
Router.get('/:id', GetUserById);

module.exports = Router;
