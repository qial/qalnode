var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy;

/*
 * Set up passport's google strategy
 */
passport.use(new GoogleStrategy({
	returnURL: 'http://qalendar-dev.qial.net/auth/google/return',
	realm: 'http://qalendar-dev.qial.net/'
},
  function(identifier, profile, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }));

/*
 *  Google Authentication Redirect
 */ 
exports.googleAuth = passport.authenticate('google');

/*
 *  Google Authentication Return URL handler
 */
exports.googleAuthReturn = passport.authenticate('google', {
	successRedirect: '/',
	failureRedirect: '/login'
});