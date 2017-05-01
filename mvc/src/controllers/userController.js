const chalk = require('chalk');
const passport = require('passport');

const User = require('../models/UserModel');

exports.getLogin = (req, res) => {
  console.log('%s Get login page', chalk.green('✓'));
  res.render('account/login', {
    title: 'Login'
  });
};

exports.getSignup = (req, res) => {
  console.log('%s Get signup page', chalk.green('✓'));
  res.render('account/signup', {
    title: 'Create Account'
  });
};

exports.postSignup = (req, res, next) => {
  req.assert('email', 'Name is require').notEmpty();
  req.assert('password', 'Password is required').notEmpty();
  req.assert('confirmPassword', 'Password is required').notEmpty()  ;
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    res.redirect('/user/signup');
  } else {
    let newUser = new User({
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      confirmPassword: req.body.confirmPassword 
    });
    
    User.findOne({ email: req.body.email }, (err, existingUser) => {
      if (err) return next(err);
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email is already exists!' });
        return res.redirect('/user/signup');
      }
      newUser.save((err) => {
        if (err) {
          return next(err);
        }
        req.flash('success', { msg: 'Successful! You can login now.' })
        res.redirect('/user/login');
      });
    })
  }
};