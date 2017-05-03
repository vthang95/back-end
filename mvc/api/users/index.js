const express = require('express');
const Router = express.Router();

// const User = require('../../src/models/UserModel');
const userController = require('./user.api');

Router.post('/signup', userController.postSignup);
Router.get('/search', userController.getSearchUserByEmail);

module.exports = Router;