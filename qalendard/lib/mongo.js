var mongoose = require('mongoose')
  , db = mongoose.createConnection('localhost', 'test');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  exports.ready = true;
  console.log("Mongoose db ready!");
  doTest();
});


function doTest() {
	var kittySchema = new mongoose.Schema({
		name: String
	});

	kittySchema.methods.speak = function () {
	  var greeting = this.name
		? "Meow name is " + this.name
		: "I don't have a name"
	  console.log(greeting);
	};

	var Kitten = db.model('Kitten', kittySchema);

	var silence = new Kitten({ name: 'Silence' });
	console.log(silence.name);// 'Silence'

	var fluffy = new Kitten({ name: 'fluffy' });
	fluffy.speak(); // "Meow name is fluffy"

	fluffy.save(function (err) {
	  if (err) console.log(err);// TODO handle the error
	  console.log('meow');
	});

	Kitten.find(function (err, kittens) {
	  if (err) console.log(err);// TODO handle err
	  console.log(kittens)
	})
}