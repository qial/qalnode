/*
 * GET account info page
 */
exports.account = function(req, res){
  res.send('account info page');
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

/*
 * GET reset password page
 *     (requires UUID from link)
 */
exports.reset = function(req, res){
  res.send('reset password page (requires uuid link)');
};

/*
 * POST resetpassword service
 */
exports.resetpassword = function(req, res){
  res.send('TODO: resetpassword function');
};

/*
 * POST changepassword service
 */
exports.changepassword = function(req, res){
  res.send('TODO: changepassword function');
};

/*
 * POST login service.
 */
exports.login = function(req, res){
  // TODO login stuff
  res.send('TODO: Login function');

  //res.render('index', { title: 'Qalendar' });
};
