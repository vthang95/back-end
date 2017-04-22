const fs = require('fs');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const slug = require('slug');
const mongoose = require('mongoose');

const _fs = require('./my_modules/api/images/imageController');
const imageRouter = require('./my_modules/api/images/');
const config = require('./config.json');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ extends: true }));
app.use(bodyParser.urlencoded({ extends: true }));

mongoose.connect(config.connectionString, (err) => {
  if (err) console.log(err);
  else console.log('Database is connected!!');
});

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

server.listen(config.port, (req, res) => {
  console.log(`App is running on ${ config.port }...`);
});