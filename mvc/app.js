/**
 * Module Dependencies
 */
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const path = require('path');
const sass = require('node-sass-middleware');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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
const homeController = require('./src/controllers/homeController');
// const userController = require('./src/controllers/userController');

const userRouter = require('./src/routes/userRouter');

/**
 * Express configurations
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
// Express session
app.use(session({
  resave: true,
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true
}));
// Connect flash
app.use(flash());
// Express Validator middleware option
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

/**
 * Use Routes
 */
app.use('/', userRouter);

/**
 * App routes
 */
app.get('/', homeController.getIndex);

/**
 * Start Express Server
 */
app.listen(app.get('port'), (req, res) => {
  console.log('%s app is running on http://localhost:%d', chalk.green('✓'), app.get('port'));
});

