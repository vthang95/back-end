const express = require('express');
const Router = express.Router();

const navigationController = require('../controllers/navigationController');

Router.get('/', navigationController.getIndex);
Router.get('/contact', navigationController.getContact);

module.exports = Router;