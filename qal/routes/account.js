
/*
 * POST login service.
 */
exports.login = function(req, res){
  // TODO login stuff
  res.send('TODO: Login function');

  //res.render('index', { title: 'Qalendar' });
};

/*
 * GET register page
 */
exports.register = function(req, res){
  res.render('register', {});
};

/*
 * GET forgot password page
 */
exports.forgot = function(req, res){
  res.render('forgot', {});
};
