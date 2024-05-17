const express = require('express');
const { GetAllUsers, UpdateUser, GetUserById } = require('../controllers/userController');
const Router = express.Router();

Router.get('/get-all', GetAllUsers);
Router.get('/:id', GetUserById);
Router.put('/:id', UpdateUser);

module.exports = Router;
