const Image = require('../../src/models/ImageModel');
const lodash = require('lodash');

exports.getAllImages = (req, res) => {
  Image.find({}, (err, docs) => {
    if (err) {
      console.log(err);
      return res.json({ error_msg: 'An error occurred!' });
    }
    res.json(docs);
  });
};

exports.getSingleImage = (req, res) => {
  let id = req.params.id;
  Image.find({ id: id }, (err, doc) => {
    if (err) {
      console.log(err);
      return res.json({ error_msg: 'An error occurred!' });
    }
    if (!doc) return res.status(500).json({ error_msg: 'Not found!' });
    res.json(doc);
  });
};

exports.postImage = (req, res) => {
  let newImage = {
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description
  }

  Image
    .findOne()
    .select('id')
    .sort({ id: -1 })
    .exec((err, imageWithLastId) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      newImage.id = (imageWithLastId && imageWithLastId.id) ? imageWithLastId.id + 1 : 1;
      Image.create(newImage, (err, doc) => {
        if (err) {
          console.log(err);
          return res.json(err);
        }
        res.json(doc);
      });
    });
};

exports.putImage = (req, res) => {
  let id = req.params.id;
  let newImage = {
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description
  }
  
  Image.findOneAndUpdate({ id: id }, newImage, (err, doc) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    Image.findOne({ id: id }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      res.json(doc);
    });
  });
};

exports.deleteImage = (req, res) => {
  let id = req.params.id;
  Image.deleteOne({ id: id }, (err, doc) => {
    if (err) {
      console.log(err);
      res.json(err);
    }
    res.json(doc);
  });
};

exports.getSearchImage = (req, res) => {
  let regex = new RegExp(req.query.q, 'i');
  Image
    .find({ name: regex })
    .limit(20)
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      res.json(docs);
    });
};
