const express = require('express');
const Router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userController = require('../controllers/userController');

Router.get('/signup', userController.getSignup);
Router.get('/login', userController.getLogin);
Router.post('/signup', userController.postSignup);
Router.post('/login', userController.postLogin);

module.exports = Router;