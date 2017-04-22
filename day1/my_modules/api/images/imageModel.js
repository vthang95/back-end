const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let imagesModel = new Schema({
  id: { type: Number, require: true},
  name: String,
  imageLink: { type: String, default: '' },
  description: { type: String },
  slugName: String,
  views: { type: Number, default: 0 },
  likes: [{
      likeBy: { type: Number }
  }],
  comments: [{
     comment: String,
    commentBy: Number
  }]
});

module.exports = mongoose.model('hotgirls', imagesModel);