/**
 * Module Dependencies
 */
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const chalk = require('chalk');
const bodyParser = require('body-parser');

/**
 * Load environment variables from .env
 */
dotenv.load({ path: '.env.example' });

/**
 * Create Express Sever
 */
const app = express();

/**
 * Connect Database (mongoDB)
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.log(err);
  console.log('%s MongoDB connection error! Please make sure MongoDB is running', chalk.red('✗'));
  process.exit();
});

/**
 * Controllers (Route handlers)
 */

/**
 * Express configurations
 */
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * App routes
 */
app.get('/', (req, res) => {
  res.send('<h1>App is running...</h1>');
});

/**
 * Start Express Server
 */
app.listen(app.get('port'), (req, res) => {
  console.log('%s app is running on http://localhost:%d', chalk.green('✓'), app.get('port'));
});

