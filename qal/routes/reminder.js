var schema = require('../schema');

function log(msg,err) {
  // do nothing
  if(err) {
    console.log(msg,err);
  }
}

/*
 * GET reminders listing
 */
exports.list = function(req, res) {
  log("reminder.list");
  schema.Reminder.find(function(err,reminders) {
    if(err) {
      log("reminder.list error:",err);
    } else {
      var str = "{reminders:"+JSON.stringify(reminders)+"}";
      res.set('Content-Type', 'application/json');
      res.send(str);
    }
  });
};

/*
 * GET single reminder
 */
exports.show = function(req, res) {
  log("reminder.show");
  var id = req.param('id');
	if(!id) {
		id = req.param('_id');
	}
	if(!id) {
		res.send("{success:false}");
	} else {
		schema.Reminder.findOne({_id: id}, function(err,reminder) {
			if(err) {
				log("reminder.show error: ",err);
				res.set('Content-Type', 'application/json');
				res.send("{success:false}");
			} else {
				var str = "{items:"+JSON.stringify(reminder)+"}";
				res.set('Content-Type', 'application/json');
				res.send(str);
			}
		});
	}
};

/*
 * POST create reminder
 */
exports.create = function(req, res) {
  log("reminder.create");
  var values = req.body;
	delete values._id;
	var reminder = new schema.Reminder(values);
	reminder.save(function(err,updated) {
		if(err) {
			log("reminder.save error: ",err);
			res.send("{success:false}");
		} else {
			res.send("{success:true,items:"+JSON.stringify(updated)+"}");
		}
	});
};

/*
 * POST edit reminder
 */
exports.edit = function(req, res) {
  log("reminder.edit");
  var update = req.body;
	if( Object.prototype.toString.call( req.body ) === '[object Array]' ) {
	    update = req.body[0];
	}
	var id = update["_id"];
	delete update._id;
	schema.Reminder.findByIdAndUpdate(id, update, function(err,reminder) {
		if(err) {
			log("reminder.edit error: ",err);
			res.set('Content-Type', 'application/json');
			res.send("{success:false}");
		} else if(reminder) {
			//var str = "{items:"+JSON.stringify(items)+"}";
			//res.send(str);

			res.set('Content-Type', 'application/json');
			res.send("{success:true}");
			reminder.save();
		} else {
			// WAT? I don't know what to do
			log("HELP! " + item,true);
			res.set('Content-Type', 'application/json');
			res.send("{success:false}");
		}
	});
};

/*
 * GET remove reminder
 */
exports.remove = function(req, res) {
  log("reminder.remove");

  //TODO reminder removal
  res.send("remove reminder");
};
