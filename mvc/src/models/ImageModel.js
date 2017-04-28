const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String },
  imageLink: { type: String, default: 'http://postroyforum.ru/assets/img/no_photo.png' },
  likes: { type: Number },
  likeBy: []
});