const fs = require('fs');
const express = require('express');
const http = require('http');

const _fs = require('./my_modules/note.js')

var app = express();

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
  let savedData = _fs.saveData(imageInfo, './imageData.json');
  if (savedData) res.send('Success!');
  else res.send('This image is already exists! Please try another one!');
});

app.get('/image/get', (req, res) => {
  let contentWillShowUp = '';
  try {
    let imageInfoObj = JSON.parse(fs.readFileSync('./imageData.json', 'utf8'));
    for (let i = 0; i < imageInfoObj.length; i++) {
      contentWillShowUp += `
        <div style="float: left; margin: 2px 2px 20px 2px">
          <div style="float:left;width: 100%;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); border-radius: 8px 8px 0px 0px"> 
            <img src="${ imageInfoObj[i].imageLink }" style="border-radius: 8px 8px 0px 0px" width="auto" height="200">
            <div style="background-color: white; text-align: center; padding: 10px 0px 1px 0px">
              <strong>${ imageInfoObj[i].name }</strong>
              <p>${ imageInfoObj[i].description }</p>
            </div>
          </div>
        </div>
      `;
    }
  } catch (e) {

  }
  res.send(contentWillShowUp);
});

const server = http.createServer(app);

server.listen(6969, (req, res) => {
  console.log('App is running on 6969...');
});