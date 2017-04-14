const fs = require('fs');
const express = require('express');
const http = require('http');

const _fs = require('./my_modules/note.js')

var app = express();

//set public folder public
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('./public/index.html');
});

app.get('/image/add', (req, res) => {
    let imageInfo = {
        name: req.query.name,
        imageLink: req.query.imageLink,
        description: req.query.description
    }

    _fs.saveData(imageInfo);
    res.send('Success!');
});

app.get('/image/get', (req, res) => {
    let contentWillShowUp = '';
    try {
        let imageInfoObj = JSON.parse(fs.readFileSync('./imageData.json', 'utf8'));
        for (let i = 0; i < imageInfoObj.length; i++) {
            contentWillShowUp += `
                <div>
                    Image Name: <span id="imageName">${ imageInfoObj[i].name }</span>
                </div>
                <div>
                    Image Description: <label id="imageName">${ imageInfoObj[i].description }</label>
                </div>
                <div>
                    <img src="${ imageInfoObj[i].imageLink }" width="350"/>
                </div>
            `
        }
    } catch (e) {

    }
    res.send(contentWillShowUp);
});

const server = http.createServer(app);

server.listen(6969, (req, res) => {
    console.log('App is running on 6969...');
});