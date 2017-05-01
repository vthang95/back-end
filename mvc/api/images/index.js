const express = require('express');
const Router = express.Router();

const imageController = require('./image.api');

Router.get('/', imageController.getAllImages);
Router.get('/:id', imageController.getSingleImage);
Router.post('/', imageController.postImage);
Router.delete('/:id', imageController.deleteImage);
Router.put('/:id', imageController.putImage);

module.exports = Router;