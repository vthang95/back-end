const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String },
  imageLink: { type: String, default: 'http://postroyforum.ru/assets/img/no_photo.png' },
  description: { type: String },
  likes: { type: Number },
  likeBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    text: String,
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
});

module.exports = mongoose.model('Image', imageSchema);