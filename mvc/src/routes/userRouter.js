const express = require('express');
const Router = express.Router();

const userController = require('../controllers/userController');

Router.get('/signup', userController.getSignup);
Router.get('/login', userController.getLogin);

module.exports = Router;