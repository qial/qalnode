var mongoose = require('mongoose')
  , db = mongoose.createConnection('localhost', 'test');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Mongoose db connection finished!");
	buildSchema();
    console.log("Schema is ready!");
	exports.ready = true;

});

function buildSchema() {
	buildItem();
}

function buildUser() {
	var userSchema = new mongoose.Schema({
		email: String,
		id: number
	});
	
	var User = db.model('User',userSchema);
	
	exports.User = User;
}

function buildItem() {
  var itemSchema = new mongoose.Schema({
		title: String,
		desc: String,
		amount: Number,
		date: { type: Date, default: Date.now },
		user: Number
	});

	var Item = db.model('Item', itemSchema);

	exports.Item = Item;
}

function buildReminder() {
	var reminderSchema = new mongoose.schema({
		startDate: {type: Date, default: Date.now },
		lastDate: {type: Date},
		lastCompleted: {type: Date},
		enabled: {type: Boolean},
		amount: Number,
		strict: Boolean
	});
	
	var Reminder = db.model('Reminder',reminderSchema);
	
	exports.Reminder = Reminder;
}
