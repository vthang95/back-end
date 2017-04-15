const fs = require('fs');

const saveData = singleData => {
  notes = [];

  try {
    let noteString = fs.readFileSync('./imageData.json');
    notes = JSON.parse(noteString);
  } catch (e) {}

  let duplicateNote = notes.filter(note =>
    note.name === singleData.name &&
    note.description === singleData.description &&
    note.imageLink === singleData.imageLink
  );

  if (duplicateNote.length === 0) {
    notes.push(singleData);
    fs.writeFileSync('./imageData.json', JSON.stringify(notes));
  } else {
    return false;
  }
  return true;
};

module.exports = {
  saveData
}