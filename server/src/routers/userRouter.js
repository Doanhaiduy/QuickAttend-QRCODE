const express = require('express');
const { GetAllUsers, UpdateUser, GetUserById } = require('../controllers/userController');
const Router = express.Router();

Router.get('/ ', GetAllUsers);
Router.put('/:id', UpdateUser);
Router.get('/:id', GetUserById);

module.exports = Router;
