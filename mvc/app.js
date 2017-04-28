/**
 * Module Dependencies
 */
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const path = require('path');
const sass = require('node-sass-middleware')

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
const homeController = require('./src/controllers/home');
const userController = require('./src/controllers/user');

/**
 * Express configurations
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));

/**
 * App routes
 */
app.get('/', homeController.index);
app.get('/login', userController.getLogin);
app.get('/signup', userController.getSignup);
``
/**
 * Start Express Server
 */
app.listen(app.get('port'), (req, res) => {
  console.log('%s app is running on http://localhost:%d', chalk.green('✓'), app.get('port'));
});

