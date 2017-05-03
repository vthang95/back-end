const mongoose = require('mongoose');
const User = require('../../src/models/UserModel');

exports.postSignup = (req, res, next) => {
  req.assert('email', '! Email is required.').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', '! Password is required.').notEmpty();
  req.assert('confirmPassword', '! Confirm Password is required.').notEmpty()  ;
  req.assert('password', '! Password must be at least 4 characters long.').len(4);
  req.assert('confirmPassword', '! Passwords do not match.').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    console.log(errors)
    return res.json({ error: errors });
  } else {
    let newUser = new User({
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      confirmPassword: req.body.confirmPassword 
    });
    User.findOne({ email: req.body.email.toLowerCase() }, (err, existingUser) => {
      if (err) return next(err);
      if (existingUser) {
        return res.json({ error_msg: 'Account with that email is already exists!'});
      }
      User
        .findOne()
        .select('uid')
        .sort({ uid: -1 })
        .exec((err, objectWithLastUid) => {
          if (err) return next(err);
          newUser.uid = (objectWithLastUid && objectWithLastUid.uid) ? objectWithLastUid.uid +1 : 1;
          newUser.save((err) => {
            if (err) {
              return next(err);
            }
            return res.json({ success_msg: 'Success!' });
          });
        });
    });
  }
};

exports.getSearchUserByEmail = (req, res) => {
  let regex = new RegExp(req.query.q);
  User
    .find({ email: regex })
    .limit(20)
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        return res.json({ error_msg: 'An error occurred!' });
      }
      res.json(docs);
    });
};