const mongoose = require('mongoose');
const User = require('../../src/models/UserModel');

exports.postSignup = (req, res, next) => {
  req.assert('email', '! Name is required.').notEmpty();
  req.assert('password', '! Password is required.').notEmpty();
  req.assert('confirmPassword', '! Password is required.').notEmpty()  ;
  req.assert('password', '! Password must be at least 4 characters long.').len(4);
  req.assert('confirmPassword', '! Passwords do not match.').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    return res.send('An error occurred!');
  } else {
    let newUser = new User({
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      confirmPassword: req.body.confirmPassword 
    });
    User.findOne({ email: req.body.email }, (err, existingUser) => {
      if (err) return next(err);
      if (existingUser) {
        return res.send('Account with that email is already exists!');
      }
      newUser.save((err) => {
        if (err) {
          return next(err);
        }
        return res.send('Success!');
      });
    });
  }
};

exports.getSignup = (req, res, next) => {
  console.log('ok')
};