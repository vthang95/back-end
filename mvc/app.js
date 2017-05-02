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
const flash = require('express-flash');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const errorHandler = require('errorhandler');
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
 * APIs Router declaration
 */
const userApiRouter = require('./api/users/');
const imageApiRouter = require('./api/images/');

/**
 * Routes declaration
 */
const userRouter = require('./src/routes/userRouter');
const navigationRouter = require('./src/routes/navigationRouter');

/**
 * Express configurations
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
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

// Passport init
app.use(passport.initialize());
app.use(passport.session());

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
 * Use Routers to render from server-side
 */
app.use('/users', userRouter);
app.use('/', navigationRouter);

/**
 * APIs Routers to response to client-side (json)
 */
app.use('/api/users', userApiRouter);
app.use('/api/images', imageApiRouter);

/**
 * Error handler
 */
app.use(errorHandler());

/**
 * Start Express Server
 */
app.listen(app.get('port'), (req, res) => {
  console.log('%s App is running on http://localhost:%d\n\tPress Ctrl-C to stop sever', chalk.green('✓'), app.get('port'));
});

