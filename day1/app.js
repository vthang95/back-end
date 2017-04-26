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
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))

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

app.get('/image/:id', (req, res) => {
  let id = req.params.id;
  _fs.getImageById(id, (err, doc) => {
    if (err) {
      res.status(500).json({message: 'Error'});
    }
    _fs.sendASingleHtmlImage(doc, htmlWillShowUp => res.send(htmlWillShowUp));
  });
});

const server = http.createServer(app);

server.listen(config.port, (req, res) => {
  console.log(`App is running on ${ config.port }...`);
});