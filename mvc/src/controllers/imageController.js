const Image = require('../models/ImageModel');

exports.getSearchImage = (req, res, next) => {
  let regex = new RegExp(req.query.q, 'i');
  Image
    .find({ name: regex })
    .sort({ id: -1 })
    .limit(20)
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.render('search-result', {
        title: 'Search Result',
        images: docs,
        text: req.query.q
      })
    });
};