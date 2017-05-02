const express = require('express');
const Router = express.Router();

const imageController = require('./image.api');

Router.get('/', imageController.getAllImages);
Router.get('/images/:id', imageController.getSingleImage);
Router.post('/', imageController.postImage);
Router.delete('/images/:id', imageController.deleteImage);
Router.put('/images/:id', imageController.putImage);
Router.get('/search', imageController.getSearchImage);

module.exports = Router;