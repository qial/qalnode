
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , account = require('./routes/account')
  , event = require('./routes/event')
  , reminder = require('./routes/reminder')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function() {
  // all environments
  app.set('port', process.env.PORT || 8124);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'wat is dis madness?' }));

  // less stuff?
  app.use(require('less-middleware')(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

  // "view" routes
  app.get( '/', routes.index);

  // account routes
  app.get( '/account', account.account);
  app.get( '/account/register', account.register);
  app.get( '/account/forgot', account.forgot);
  app.get( '/account/reset', account.reset);
  app.post('/account/resetpassword', account.resetpassword);
  app.post('/account/changepassword', account.changepassword);
  app.post('/account/login', account.login);

  // item routes
  app.get( '/events(.json)?', event.list);
  app.get( '/event/show/:id',event.show);
  app.post('/event/new(.json)?',event.create);
  app.post('/event/edit(.json)?',event.edit);
  app.post('/event/complete/:id',event.complete);
  app.post('/event/delete/:id',event.remove);

  // reminder routes
  app.get( '/reminders(.json)?', reminder.list);
  app.get( '/reminder/show/:id',reminder.show);
  app.post('/reminder/new(.json)?',reminder.create);
  app.post('/reminder/edit(.json)?',reminder.edit);
  app.post('/reminder/delete/:id?',reminder.remove);

  // app chunk routes
  //app.get( '/chunk/items.html',

  // service routes
  //app.get('/auth/google',auth.googleAuth);
  //app.get('/auth/google/return',auth.googleAuthReturn);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
