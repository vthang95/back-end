const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/UserModel');

passport.use(new LocalStrategy({ usernameField: 'email' },
  function(email, password, done) {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` });
      }
      user.comparePassword(password, user.password, (err, isMatch) => {
        if (err) { return done(err); }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: 'Invalid email or password.' });
      });
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/login', {
    title: 'Login'
  });
};

exports.postLogin = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/users/login');
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      req.flash('info', info);
      return res.redirect('/users/login');
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
};

exports.getSignup = (req, res) => {
  res.render('account/signup', {
    title: 'Create Account'
  });
};

exports.postSignup = (req, res, next) => {
  req.assert('username', 'Username is not valid').notEmpty();
  req.assert('email', '! Email is required.').notEmpty();
  req.assert('email', '! Email is not valid').isEmail();
  req.assert('password', '! Password is required.').notEmpty();
  req.assert('confirmPassword', '! Confirm Password is required.').notEmpty()  ;
  req.assert('password', '! Password must be at least 4 characters long.').len(4);
  req.assert('confirmPassword', '! Passwords do not match.').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    console.log(errors)
    req.flash('errors', errors);
    res.redirect('/users/signup');
  } else {
    let newUser = new User({
      username: req.body.username,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    });

    User.findOne({ email: req.body.email.toLowerCase() }, (err, existingUser) => {
      if (err) return next(err);
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email is already exists!' });
        return res.redirect('/users/signup');
      }
      User
        .findOne()
        .select('uid')
        .sort({ uid: -1 })
        .exec((err, objectWithLastUid) => {
          if (err) return next(err);
          newUser.uid = (objectWithLastUid && objectWithLastUid.uid) ? objectWithLastUid.uid + 1 : 1;
          newUser.save((err) => {
            if (err) {
              return next(err);
            }
            req.flash('success', { msg: 'Successful! You can login now.' })
            res.redirect('/users/login');
          });
        });
    });
  }
};

exports.putUpdateUser = (req, res) => {
  
};

exports.getSearchUser = (req, res) => {
  let regex = new RegExp(req.query.q, 'i');
  User
    .find({ username: regex })
    .limit(20)
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        return res.json({ error_msg: 'An error occurred!' });
      }
      res.json(docs);
    });
  // TODO: Change response
};
