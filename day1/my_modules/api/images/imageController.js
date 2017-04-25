const fs = require('fs');
const _ = require('underscore');

const imageDataPath = './imgData.json'
const imageModel = require('./imageModel');

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

const saveImageCollection = (singleData) => {
  notes = [];

  try {
    let noteString = fs.readFileSync(imageDataPath);
    notes = JSON.parse(noteString);
  } catch (e) {
    console.log(e)
  }

  let duplicateNote = notes.filter(note =>
    note.name === singleData.name &&
    note.description === singleData.description &&
    note.imageLink === singleData.imageLink || note.name === singleData.name
  );

  if (duplicateNote.length === 0) {
    notes.push(singleData);
    fs.writeFileSync(imageDataPath, JSON.stringify(notes));
  } else {
    return false;
  }
  return true;
};

const fetchImageCollection = () => {
  try {
    let collectionToFetch = JSON.parse(fs.readFileSync(imageDataPath, 'utf-8'));
    return collectionToFetch;
  } catch (e) {
    console.log(e);
  }
};

const deleteImageBySlugName = (slugName) => {
  try {
    let collection = JSON.parse(fs.readFileSync(imageDataPath, 'utf-8'));
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].slugName === slugName) {
        collection.splice(collection.indexOf(collection[i]), 1);
      }
    }
    fs.writeFileSync(imageDataPath, JSON.stringify(collection));
  } catch (e) {
    console.log(e);
  }
};

const getImageBySlugName = (slugName) => {
  try {
    let collection = JSON.parse(fs.readFileSync(imageDataPath, 'utf-8'));
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].slugName === slugName) {
        return collection[i];
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const findAndModifyImageBySlugName = (slugName, image) => {
  try {
    let collection = JSON.parse(fs.readFileSync(imageDataPath, 'utf-8'));

    for (let i = 0; i < collection.length; i++) {
      if (image.name === collection[i].name && collection[i].slugName != slugName) {
        break;
      };
      if (collection[i].slugName === slugName) {
        collection.splice(collection.indexOf(collection[i]), 1, image);
      }
    }
    fs.writeFileSync(imageDataPath, JSON.stringify(collection));
    return collection;
  } catch (e) {
    console.log(e);
  }
};

const sendASingleHtmlImage = (image) => {
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
  saveImageCollection,
  fetchImageCollection,
  deleteImageBySlugName,
  getImageBySlugName,
  findAndModifyImageBySlugName,
  sendASingleHtmlImage,
  addImage,
  getImageCollection
}