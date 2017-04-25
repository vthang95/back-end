const fs = require('fs');
const _ = require('underscore');

const imageModel = require('./imageModel');

const imageDataPath = './imgData.json'

const addImage = (data, successCallBack) => {
  imageModel.create(data, (err, doc) => {
    if (err) console.log(err);
    else {
      imageModel.find((err, docs) => {
        if (err) console.log(err);
        else successCallBack(docs);
      });
    };
  });
};

const getImageCollection = (successCallBack) => {
  imageModel.find((err, docs) => {
    if (err) console.log(err);
    else successCallBack(docs);
  });
};

const deleteImageBySlugName = slugName => {
  console.log('haha')
  imageModel.deleteOne({'slugName': slugName}, (err, result) => {
    if (err) console.log(err);
  });
};

const getImageBySlugName = (slugName, successCallBack) => {
  imageModel.findOne({'slugName': slugName}, (err, doc) => {
    if (err) console.log(err);
    else successCallBack(doc);
  });
};

const findAndModifyImageBySlugName = (slugName, image) => {
  imageModel.findOneAndUpdate({'slugName': slugName}, image, (err, docs) => {
    if (err) console.log(err);
  });
};

const sendASingleHtmlImage = image => {
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
  return html;
};

module.exports = {
  deleteImageBySlugName,
  getImageBySlugName,
  findAndModifyImageBySlugName,
  sendASingleHtmlImage,
  addImage,
  getImageCollection
}