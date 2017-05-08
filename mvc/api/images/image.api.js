const Image = require('../../src/models/ImageModel');
const User = require('../../src/models/UserModel');
const lodash = require('lodash');
const config = require('../../config.json')

exports.getAllImages = (req, res) => {
  Image
    .find(
      {},
      { name: 1, description: 1, imageLink: 1, id: 1, _id: 0, likes: 1, createdAt: 1,
        updatedAt: 1, views: 1, likedBy: 1, comments: 1 }
    )
    .populate('likedBy', 'uid')
    .populate('comments.postedBy', 'uid')
    .lean()
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        return res.json({ error_msg: 'An error occurred!' });
      }
      res.json(docs);
    });
};

exports.getSingleImage = (req, res) => {
  let id = req.params.id;
  Image
    .findOne(
      { id: id },
      { name: 1, description: 1, imageLink: 1, id: 1, _id: 0, likes: 1, createdAt: 1,
        updatedAt: 1, views: 1, likedBy: 1, comments: 1 }
    )
    .populate('likedBy', 'likedBy.uid')
    .populate('comments.postedBy', 'uid')
    .lean()
    .exec((err, doc) => {
      if (err) {
        console.log(err);
        return res.json({ error_msg: 'An error occurred!' });
      }
      if (!doc) return res.status(500).json({ error_msg: 'Not found!' });
      Image
        .findOneAndUpdate({ id: id }, { $inc: { 'views': 1 } })
        .exec((err) => {
          if (err) {
            console.log(err);
            return res.json({ error_msg: 'An error occurred!' });
          }
          res.json(doc);
        })
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
        // doc here for test
        // TODO: Change doc to message. Successfull
      });
    });
};

exports.putImage = (req, res) => {
  let id = req.params.id;
  let newImage = {
    name: req.body.name,
    imageLink: req.body.imageLink || config.DEFAULT_IMAGE,
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

exports.postLikeImage = (req, res) => {
  let id = req.params.id;
  let uid = req.body.uid;
  console.log(id, uid)
  User
    .findOne({ uid: uid })
    .exec((err, doc) => {
      if (err) {
        console.log(err);
        return res.json({ error_msg: 'An error occurred!' });
      }

      if (!doc) return res.json('An error occurred! User not found!');
      Image
      .findOneAndUpdate(
        { id: id },
        { $push: { "likedBy": doc._id }, $inc: { "likes": 1 } }
      )
      .populate('likedBy', 'uid')
      .select({ likedBy: 1 })
      .lean()
      .exec((err, doc) => {
        if (err) {
          console.log(err);
          return res.json({ error_msg: 'An error occurred!' });
        }
        res.json({ success_msg: 'Like Successfully!' });
      });
    });
};

exports.postCommentImage = (req, res) => {
  let id = req.params.id;
  let comment = {
    uid: req.body.uid,
    text: req.body.text
  };
  User
    .findOne({ uid: comment.uid })
    .exec((err, doc) => {
      if (err) {
        console.log(err);
        return res.json({ error_msg: 'An error occurred!' });
      }
      if (doc) {
        Image
          .findOneAndUpdate(
            { id: id },
            { $push: { "comments": { text: comment.text, postedBy: doc._id } } }
          )
          .populate('comments', 'postedBy text')
          .populate('comments.postedBy', 'uid')
          .select('comments')
          .exec((err, doc) => {
            if (err) {
              console.log(err);
              res.json({ error_msg: 'An error occurred!' })
            }
            res.json({ success_msg: 'Comment Successfully!' });
          })
      }
    });
}
