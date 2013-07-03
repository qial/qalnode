
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
//  , user = require('./routes/user')
  , item = require('./routes/item')
  , auth = require('./routes/auth')
  , reminder = require('./routes/reminder')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8124);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// "view" routes
app.get('/', routes.index);

// item routes
app.get( '/items(.json)?', item.list);
app.get( '/item/show/:id',item.show);
app.post('/item/new(.json)?',item.create);
app.post('/item/edit(.json)?',item.edit);
app.post('/item/complete/:id',item.complete);
app.post('/item/delete/:id',item.remove);

// reminder routes
app.get( '/reminders(.json)?', reminder.list);
app.get( '/reminder/show/:id',reminder.show);
app.post('/reminder/new(.json)?',reminder.create);
app.post('/reminder/edit(.json)?',reminder.edit);
app.post('/reminder/delete/:id?',reminder.remove);

// service routes
app.get('/auth/google',auth.googleAuth);
app.get('/auth/google/return',auth.googleAuthReturn);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
