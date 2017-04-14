const fs = require('fs');

const saveData = singleData => {
    notes = [];

    const test = fs.readFileSync('./imageData.json', 'utf8');

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
        confirm('This picture detail is exist! Please try another one ;))');
    }
};

module.exports = {
    saveData
}