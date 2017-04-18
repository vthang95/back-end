const fs = require('fs');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const db = mongojs('imageList', ['imageList']);
const slug = require('slug');

const _fs = require('./my_modules/images/imageController.js')

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ extends: true }));
app.use(bodyParser.urlencoded({ extends: true }));

app.get('/', (req, res) => {
  res.sendfile('./public/index.html');
});

app.get('/addImage', (req, res) => {
  let data = _fs.fetchImageCollection('./imgData.json');
  res.json(data);
});

app.post('/addImage', (req, res) => {
  let imageInfo = {
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description,
    slugName: slug(req.body.name, { lowercase: false })
  };
  _fs.saveImageCollection(imageInfo, './imgData.json');
  data = _fs.fetchImageCollection('./imgData.json')
  res.json(data);
});

app.put('./addImage', (req, res) => {

});

app.delete('/addImage/:slugName', (req, res) => {
  let slugName = req.params.slugName;
  _fs.deleteImageBySlugName(slugName, './imgData.json');
  let data = _fs.fetchImageCollection('./imgData.json')
  res.json(data);
});

app.post('/image', (req, res) => {
  let imageInfo = {
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description
  }
  let savedData = _fs.saveImageCollection(imageInfo, './imageData.json');
  if (savedData) res.send('Success!');
  else res.send('This image is already exists! Please try another one!');
});

app.get('/image', (req, res) => {
  let contentWillShowUp = '';
  try {
    var imageInfoObj = _fs.fetchImageCollection('./imageData.json');
    for (let i = 0; i < imageInfoObj.length; i++) {
      contentWillShowUp += `
        <div style="float: left; margin: 4px 4px 20px 4px">
          <div style="float:left;width: 100%;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); border-radius: 8px 8px 0px 0px"> 
            <img src="${ imageInfoObj[i].imageLink }" style="border-radius: 8px 8px 0px 0px" width="auto" height="150">
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

app.put('/image', (req, res) => {

});

app.delete('/image', (req, res) => {

});

const server = http.createServer(app);

server.listen(6969, (req, res) => {
  console.log('App is running on 6969...');
});