const express = require('express');
const Router = express.Router();

const imageController = require('../controllers/imageController');

Router.get('/search', imageController.getSearchImage);

module.exports = Router;