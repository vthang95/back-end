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
const logger = require('morgan');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const errorHandler = require('errorhandler');
const LocalStrategy = require('passport-local').Strategy;

/**
 * Load environment variables from .env || config
 */
// dotenv.load({ path: '.env.example' });
const config = require('./config.json')

/**
 * Create Express Sever
 */
const app = express();

/**
 * Connect Database (mongoDB)
 */
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI);
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
const imageRouter = require('./src/routes/imageRouter')
const navigationRouter = require('./src/routes/navigationRouter');

/**
 * Express configurations
 */
app.set('port', config.PORT || 3000);
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
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
  secret: config.SESSION_SECRET,
  saveUninitialized: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
      req.path !== '/users/login' &&
      req.path !== '/users/signup' &&
      !req.path.match(/^\/auth/) &&
      !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
      req.path == '/account') {
    req.session.returnTo = req.path;
  }
  next();
});

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
app.use('/images', imageRouter);
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

