const express = require('express');
const Router = express.Router();

const userController = require('../controllers/userController');

Router.get('/signup', userController.getSignup);
Router.get('/login', userController.getLogin);
Router.post('/signup', userController.postSignup);

module.exports = Router;