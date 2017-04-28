const chalk = require('chalk');

exports.index = (req, res) => {
  if (req) {
    console.log('%s Get home page', chalk.green('✓'));
  }
  res.render('home', {
    title: 'Home'
  });
};