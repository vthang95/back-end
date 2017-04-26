const express = require('express');
const Router = express.Router();
const imageController = require('./imageController');
const mongoose = require('mongoose');
const slug = require('slug');

const images = require('./imageModel');

Router.get('/', (req, res) => {
  imageController.getImageCollection((err, docs) => {
    if (err) {
      res.status(500).json({message: 'Error'})
    }
    res.json(docs)
  });
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
  imageController.addImage(imageInfo, (err, docs) => {
    if (err) {
      res.status(500).json({message: 'Error'});
    }
    res.json(docs);
  });
});

Router.put('/:id', (req, res) => {
  let id = req.params.id;
  let imageInfo = {
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description,
    slugName: slug(req.body.name, {
      lowercase: false
    })
  };
  imageController.findAndModifyImageById(id, imageInfo, () => {
    imageController.getImageCollection((err, docs) => {
      if (err) {
        res.status(500).json({message: 'Error'});
      }
      res.json(docs);
    });
  });
});

Router.delete('/:id', (req, res) => {
  let id = req.params.id;
  imageController.deleteImageById(id);
  imageController.getImageCollection((err, docs) => {
    if (err) {
      res.status(500).json({message: 'Error'});
    }
    res.json(docs);
  });
});

Router.get('/:id', (req, res) => {
  let id = req.params.id;
  imageController.getImageById(id, (err, docs) => {
    if (err) {
      res.status(500).json({message: 'Error'});
    }
    res.json(docs);
  });
});

module.exports = Router;