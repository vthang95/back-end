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
        .exec((err, objectWithMaxUid) => {
          if (err) return next(err);
          newUser.uid = (objectWithMaxUid && objectWithMaxUid.uid) ? objectWithMaxUid.uid +1 : 1;
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
