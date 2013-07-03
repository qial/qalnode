// routes/auth.js
var schema = require('../schema');
var passport = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// simple serialization for now
passport.serializeUser(function(user, done) {
  //console.log("serializeUser: " + user);
  var realUser = JSON.parse(JSON.stringify(user));
  //console.log(realUser);
  //console.log(realUser.uid);
  done(null, realUser.uid);
});

passport.deserializeUser(function(obj, done) {
  //console.log("deserializeObj: "+obj);
  //console.log(obj);
  schema.User.findOne({ uid: obj }, function(err, user) {
    if(err) {
      console.log("deserializing object fail!",err);
      done(err, user);
    } else {
      done(null, user);
    }

  });

});

/*
 * Set up passport's google strategy
 */
passport.use(new GoogleStrategy({
  clientID: "746908237218.apps.googleusercontent.com",
  clientSecret: "mSdE-0XOKpP09NBEng2rEQCn",
  callbackURL: "http://qalendar-dev.qial.net/auth/google/return"
  //returnURL: 'http://qalendar-dev.qial.net/auth/google/return',
	//realm: 'http://qalendar-dev.qial.net/'
},
  function(accessToken, refreshToken, profile, done) {
    //console.log("accessToken: " + JSON.stringify(accessToken));
    //console.log("refreshToken: " + JSON.stringify(refreshToken));
    //console.log("profile: " + JSON.stringify(profile));
    schema.User.findOneAndUpdate(
      { uid: profile.id }, // conditions
      {
        email: profile.emails[0].value
      },                     // update
      { upsert: true },       // options
      function(err, user) {
        done(err, user);
    });
  }
));

/*
 *  Google Authentication Redirect
 */
exports.googleAuth = passport.authenticate('google',
     { scope: ['openid','email'] });

/*
 *  Google Authentication Return URL handler
 */
exports.googleAuthReturn = passport.authenticate('google', {
	successRedirect: '/',
	failureRedirect: '/login'
});

exports.passport = passport;