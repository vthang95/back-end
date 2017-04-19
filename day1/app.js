const fs = require('fs');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const slug = require('slug');

const _fs = require('./my_modules/images/imageController.js')

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ extends: true }));
app.use(bodyParser.urlencoded({ extends: true }));

app.get('/', (req, res) => {
  res.sendfile('./public/index.html');
});

app.get('/image', (req, res) => {
  res.sendfile('./public/index.html');
});

app.get('/addImage', (req, res) => {
  let data = _fs.fetchImageCollection();
  res.json(data);
});

app.post('/addImage', (req, res) => {
  let imageInfo = {
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description,
    slugName: slug(req.body.name, { lowercase: false })
  };
  _fs.saveImageCollection(imageInfo);
  data = _fs.fetchImageCollection();
  res.json(data);
});

app.delete('/addImage/:slugName', (req, res) => {
  let slugName = req.params.slugName;
  _fs.deleteImageBySlugName(slugName);
  let data = _fs.fetchImageCollection()
  res.json(data);
});

app.get('/addImage/:slugName', (req, res) => {
  let slugName = req.params.slugName;
  let image = _fs.getImageBySlugName(slugName);
  res.json(image);
});
app.get('/image/:slugName', (req, res) => {
  let slugName = req.params.slugName;
  let image = _fs.getImageBySlugName(slugName);
  htmlWilShowUp = _fs.sendASingleImage(image);
  res.send(htmlWilShowUp);
});

app.put('/addImage/:slugName', (req, res) => {
  let slugName = req.params.slugName;
  let imageInfo = {
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description,
    slugName: slug(req.body.name, { lowercase: false })
  };
  let collection = _fs.findAndModifyImageBySlugName(slugName, imageInfo);
  res.json(collection);
});

const server = http.createServer(app);

server.listen(6969, (req, res) => {
  console.log('App is running on 6969...');
});