
exports.getIndex = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

exports.getContact = (req, res) => {
  res.render('home', {
    title: 'Contact'
  });
};