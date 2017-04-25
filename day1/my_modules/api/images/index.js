const express = require('express');
const Router = express.Router();
const _fs = require('./imageController');
const mongoose = require('mongoose');
const slug = require('slug');

const images = require('./imageModel');

Router.get('/', (req, res) => {
  // let data = _fs.fetchImageCollection();
  // res.json(data);
  _fs.getImageCollection((docs) => {
    res.json(docs);
  })
});

Router.post('/', (req, res) => {
  let imageInfo = {
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description,
    slugName: slug(req.body.name, {
      lowercase: false
    })
  };
  // _fs.saveImageCollection(imageInfo);
  // data = _fs.fetchImageCollection();
  _fs.addImage(imageInfo, (docs) => {
    res.json(docs);
  });
  // res.json(data);
});

Router.put('/:slugName', (req, res) => {
  let slugName = req.params.slugName;
  let imageInfo = {
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description,
    slugName: slug(req.body.name, {
      lowercase: false
    })
  };
  let collection = _fs.findAndModifyImageBySlugName(slugName, imageInfo);
  res.json(collection);
});

Router.delete('/:slugName', (req, res) => {
  let slugName = req.params.slugName;
  _fs.deleteImageBySlugName(slugName);
  let data = _fs.fetchImageCollection()
  res.json(data);
});

Router.get('/:slugName', (req, res) => {
  let slugName = req.params.slugName;
  let image = _fs.getImageBySlugName(slugName);
  res.json(image);
});

module.exports = Router;