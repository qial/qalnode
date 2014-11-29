var mongoose = require('mongoose')
  , db = mongoose.createConnection('localhost', 'test');

db.on('error', console.error.bind(console, 'connection error:'));

// open database connection, then build models
db.once('open', function() {
	console.log("Mongoose db connection finished!");
	buildSchema();
    console.log("Schema is ready!");
	exports.ready = true;

});

function buildSchema() {
	buildEvent();
  buildUser();
  buildReminder();
}

function buildUser() {
	var userSchema = require('./user-schema.js');

	var User = db.model('User',userSchema);

	exports.User = User;
}

function buildEvent() {
  var eventSchema = require('./event-schema.js');

	var Event = db.model('Event', eventSchema);

	exports.Event = Event;
}

function buildReminder() {
	var reminderSchema = require('./reminder-schema.js');

	var Reminder = db.model('Reminder',reminderSchema);

	exports.Reminder = Reminder;
}
