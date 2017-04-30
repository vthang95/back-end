const chalk = require('chalk');

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

exports.postSignup = (req, res) => {
  let signupInfomation = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  }

  req.assert('email', 'Name is require').notEmpty();
  req.assert('password', 'Password is required').notEmpty();
  req.assert('confirmPassword', 'Password is required').notEmpty()  ;
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    res.redirect('/user/signup');
  }
};