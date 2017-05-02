const chalk = require('chalk');

exports.getIndex = (req, res) => {
  if (req) {
    console.log('%s Get home page', chalk.green('✓'));
  }
  res.render('home', {
    title: 'Home'
  });
};

exports.getContact = (req, res) => {
  if (req) {
    console.log('%s Get contact page', chalk.green('✓'));
  }
  res.render('home', {
    title: 'Contact'
  });
};