const express = require('express');
const Router = express.Router();
const _fs = require('./imageController');
const mongoose = require('mongoose');
const slug = require('slug');

const images = require('./imageModel');

Router.get('/', (req, res) => {
  _fs.getImageCollection(docs => res.json(docs));
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
  _fs.addImage(imageInfo, (docs) => res.json(docs));
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
  _fs.findAndModifyImageBySlugName(slugName, imageInfo);
  _fs.getImageCollection(docs => res.json(docs));
});

Router.delete('/:slugName', (req, res) => {
  let slugName = req.params.slugName;
  _fs.deleteImageBySlugName(slugName);
  _fs.getImageCollection(docs => res.json(docs));
});

Router.get('/:slugName', (req, res) => {
  let slugName = req.params.slugName;
  _fs.getImageBySlugName(slugName, (doc) => {res.json(doc)});
});

module.exports = Router;