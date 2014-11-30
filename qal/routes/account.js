var schema = require('../schema');

function log(msg,err) {
	// do nothing
	if(err) {
		console.log(msg,err);
	}
}

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
  res.render('account/register', {title:'Register'});
};

/*
 * GET forgot password page
 */
exports.forgot = function(req, res){
  res.render('account/forgot', {title:'Forgot Password'});
};

/*
 * GET reset password page
 *     (requires UUID from link)
 */
exports.reset = function(req, res){
  res.send('reset password page (requires uuid link)');
};

/*
 * POST create account service
 */
exports.create = function(req, res){
  //res.send('create account');
  log("user.create");
	var values = req.body;
  console.log(values);
	delete values._id;
  //TODO: double check password confirmation first
  //TODO: check that the email isn't taken already
  delete values.confirm;
	var user = new schema.User(values);
	user.save(function(err,updated) {
		if(err) {
			log("user.save error: ",err);
			res.send("{success:false}");
		} else {
			//res.send("{success:true,user:"+JSON.stringify(updated)+"}");
      res.send("{success:true}");
		}
	});
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
