const fs = require('fs');

const saveImageCollection = (singleData, path) => {
  notes = [];

  try {
    let noteString = fs.readFileSync(path);
    notes = JSON.parse(noteString);
  } catch (e) {
    console.log(e)
  }

  let duplicateNote = notes.filter(note =>
    note.name === singleData.name &&
    note.description === singleData.description &&
    note.imageLink === singleData.imageLink
  );

  if (duplicateNote.length === 0) {
    notes.push(singleData);
    fs.writeFileSync(path, JSON.stringify(notes));
  } else {
    return false;
  }
  return true;
};

const fetchImageCollection = path => {
  try {
    let collectionToFetch = JSON.parse(fs.readFileSync(path, 'utf-8'));
    return collectionToFetch;
  } catch (e) {
    console.log(e);
  }
};

const deleteImageBySlugName = (slugName, path) => {
  try {
    let collection = JSON.parse(fs.readFileSync(path, 'utf-8'));
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].slugName === slugName) {
        collection.splice(collection.indexOf(collection[i]), 1);
      }
    }
    fs.writeFileSync(path, JSON.stringify(collection));
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  saveImageCollection,
  fetchImageCollection,
  deleteImageBySlugName
}