const chalk = require('chalk');

exports.getLogin = (req, res) => {
  if (req) {
    console.log('%s Get login page', chalk.green('✓'));
  }
  res.render('account/login', {
    title: 'Login'
  });
};