const Image = require('../models/ImageModel');


exports.getIndex = (req, res, next) => {
  Image
    .find()
    .sort({ id: -1})
    .limit(10)
    .exec((err, docs) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    console.log(docs)
    res.render('home', {
      title: 'Home',
      images: docs 
    });
  })
};

exports.getContact = (req, res) => {
  res.render('home', {
    title: 'Contact'
  });
};