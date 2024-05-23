const express = require('express');
const {
    LoginUser,
    RegisterUser,
    ForgotPassword,
    Verification,
    ResetPassword,
    ChangePassword,
} = require('../controllers/authController');

const Router = express.Router();

Router.post('/login', LoginUser);
Router.post('/register', RegisterUser);
Router.post('/forgotPassword', ForgotPassword);
Router.post('/verification', Verification);
Router.post('/resetPassword', ResetPassword);
Router.post('/changePassword', ChangePassword);

module.exports = Router;
