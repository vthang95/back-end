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

const sendASingleImage = (image) => {
  html = `
    <html>
      <head>
        <title>${ image.name }</title>  
      </head>
      <body>
      <div style="margin-left: 50px">
        <div style="float: left; margin: 2px 2px 20px 2px;align:center">
          <div style="float:left;width: 100%;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); border-radius: 8px 8px 0px 0px"> 
            <img src="${ image.imageLink }" style="border-radius: 8px 8px 0px 0px" width="auto" height="500">
            <div style="background-color: white; text-align: center; padding: 10px 0px 1px 0px">
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
  sendASingleImage
}