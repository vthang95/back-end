const fs = require('fs');
const imageDataPath = './imgData.json'

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
      if (slugName != image.slugName || collection[i].name != image.name) return collection;
    }

    for (let i = 0; i < collection.length; i++) {
      if (collection[i].slugName === slugName) {
        console.log('fucl')
        collection.splice(collection.indexOf(collection[i]), 1, image);
      }
    }
    fs.writeFileSync(imageDataPath, JSON.stringify(collection));
    return collection;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  saveImageCollection,
  fetchImageCollection,
  deleteImageBySlugName,
  getImageBySlugName,
  findAndModifyImageBySlugName
}