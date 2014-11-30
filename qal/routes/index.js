
/*
 * GET home/login page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'Qalendar' });
};

/*
 * GET main page
 */
exports.main = function(req, res){
  res.render('main', { title: 'Qalendar' });
};
