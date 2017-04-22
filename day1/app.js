const fs = require('fs');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const slug = require('slug');
const mongoose = require('mongoose');

const _fs = require('./my_modules/api/images/imageController');
const imageRouter = require('./my_modules/api/images/');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({
  extends: true
}));
app.use(bodyParser.urlencoded({
  extends: true
}));

app.get('/', (req, res) => {
  res.sendfile('./public/index.html');
});

app.get('/image', (req, res) => {
  res.sendfile('./public/index.html');
});

app.use('/api/image', imageRouter);

app.get('/image/:slugName', (req, res) => {
  let slugName = req.params.slugName;
  let image = _fs.getImageBySlugName(slugName);
  htmlWillShowUp = _fs.sendASingleHtmlImage(image);
  res.send(htmlWillShowUp);
});

const server = http.createServer(app);

server.listen(6969, (req, res) => {
  console.log('App is running on 6969...');
});