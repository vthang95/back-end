const fs = require('fs');
const express = require('express');

var app = express();

//set public folder public
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('./public/index.html');
});

app.get('/image/add', (req, res) => {
    // delcare an object
    var imageInfo = {
            name: req.query.name,
            imageLink: req.query.imageLink,
            description: req.query.description
        }
        // write to file
    fs.writeFileSync('imageData.json', JSON.stringify(imageInfo));
    // success alert
    res.send('Success!');
});

app.get('image/get', function() {
    // send back a picture with details without replace the old data;
})

//mo 1 port de chay local
app.listen(6969, (req, res) => {
    console.log('App is running on 6969...');
});