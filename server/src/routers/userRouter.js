const express = require('express');
const { GetAllUsers, UpdateUser, GetUserById, UploadAvatar } = require('../controllers/userController');
const upload = require('../utils/multer');
const Router = express.Router();

Router.get('/get-all', GetAllUsers);
Router.get('/:id', GetUserById);
Router.put('/:id', UpdateUser);
Router.post('/upload-avatar/:id', upload.single('avatar'), UploadAvatar);

module.exports = Router;
