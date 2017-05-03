const express = require('express');
const Router = express.Router();

const imageController = require('./image.api');

Router.get('/', imageController.getAllImages);
Router.get('/image/:id', imageController.getSingleImage);
Router.post('/', imageController.postImage);
Router.delete('/image/:id', imageController.deleteImage);
Router.put('/image/:id', imageController.putImage);
Router.get('/search', imageController.getSearchImage);

module.exports = Router;