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
}