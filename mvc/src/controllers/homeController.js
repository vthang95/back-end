const chalk = require('chalk');

exports.getIndex = (req, res) => {
  if (req) {
    console.log('%s Get home page', chalk.green('✓'));
  }
  res.render('home', {
    title: 'Home'
  });
};