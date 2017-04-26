const fs = require('fs');
const _ = require('underscore');

const imageModel = require('./imageModel');

const imageDataPath = './imgData.json'

const addImage = (data, callback) => {
  imageModel.create(data, (err, doc) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    imageModel
      .find()
      .exec((err, docs) => {
        if (err) console.log(err);
        return callback(err, docs);
      })
    });
};

const getImageCollection = (callback) => {
  imageModel
    .find()
    .exec((err, docs) => {
      if (err) console.log(err);
      return callback(err, docs);
  });
};

const deleteImageBySlugName = slugName => {
  console.log('haha')
  imageModel
    .deleteOne({'slugName': slugName})
    .exec((err, result) => {
      if (err) console.log(err);
  });
};

const deleteImageById = id => {
  console.log('haha')
  imageModel
    .deleteOne({'_id': id})
    .exec((err, result) => {
      if (err) console.log(err);
  });
};

const getImageById = (id, callback) => {
  imageModel
    .findOne({'_id': id})
    .exec((err, doc) => {
      if (err) console.log(err);
      else callback(err, doc);
  });
};

const findAndModifyImageById = (id, image, callback) => {
  imageModel.findOneAndUpdate({'_id': id}, image, (err, docs) => {
    if (err) console.log(err);
    callback();
  });
};

const sendASingleHtmlImage = (image, callback) => {
  html = `
    <html>
      <head>
        <title>${ image.name }</title>
        <link rel="stylesheet" href="/css/style.css">
      </head>
      <body>
        <div style="margin: auto; width: 50%">
          <div class="image-frame">
            <div class="image-style">
              <img src="${ image.imageLink }" class="image image-sg" width="auto" height="auto" />
              <div class="image-textbox">
                <strong>${ image.name }</strong>
                <p>${ image.description }</p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
  callback(html);
};

module.exports = {
  deleteImageBySlugName,
  deleteImageById,
  getImageById,
  findAndModifyImageById,
  sendASingleHtmlImage,
  addImage,
  getImageCollection
}