var schema = require('../schema');

function log(msg,err) {
	// do nothing
	if(err) {
		console.log(msg,err);
	}
}

function getAll(callback){
	schema.Event.find(function(err,items) {
		if(err) {
      log("event.list error:",err);
		} else {
			callback(items);
		}
	});
}

/*
 * GET events listing.
 */
exports.list = function(req, res){
	log("event.list");
  getAll(function(items) {
    var str = "{events:"+JSON.stringify(items)+"}";
    res.set('Content-Type', 'application/json');
    res.send(str);
  });
};

exports.listHtml = function(req, res){
	log("event.list view as html");
  getAll(function(items) {
    var str = "{events:"+JSON.stringify(items)+"}";
    res.set('Content-Type', 'application/json');
    res.send(str);
  });
};

/*
 * GET single event
 */
exports.show = function(req, res) {
	log("event.show");
	var id = req.param('id');
	if(!id) {
		id = req.param('_id');
	}
	if(!id) {
		res.send("{success:false}");
	} else {
		schema.Event.findOne({_id: id}, function(err,item) {
			if(err) {
				log("event.show error: ",err);
				res.set('Content-Type', 'application/json');
				res.send("{success:false}");
			} else {
				var str = "{events:"+JSON.stringify(item)+"}";
				res.set('Content-Type', 'application/json');
				res.send(str);
			}
		});
	}
};

/*
 * POST create event
 */
exports.create = function(req, res) {
	log("event.create");
	var values = req.body;
	delete values._id;
	var event = new schema.Event(values);
	event.save(function(err,updated) {
		if(err) {
			log("event.save error: ",err);
			res.send("{success:false}");
		} else {
			res.send("{success:true,events:"+JSON.stringify(updated)+"}");
		}
	});
};

/*
 * POST edit event
 */
exports.edit = function(req, res) {
	log("event.edit");
//	var id = req.param('id');
//	if(!id) {
//		id = req.param('_id');
//	}
//	if(!id) {
//		res.send("{success:false}");
//	} else {
//  var update = {};
	var update = req.body;
	if( Object.prototype.toString.call( req.body ) === '[object Array]' ) {
	    update = req.body[0];
	}
	var id = update["_id"];
	delete update._id;
	schema.Event.findByIdAndUpdate(id, update, function(err,item) {
		if(err) {
			log("event.edit error: ",err);
			res.set('Content-Type', 'application/json');
			res.send("{success:false}");
		} else if(item) {
			//var str = "{items:"+JSON.stringify(items)+"}";
			//res.send(str);

			res.set('Content-Type', 'application/json');
			res.send("{success:true}");
			item.save();
		} else {
			// WAT? I don't know what to do
			log("HELP! " + item,true);
			res.set('Content-Type', 'application/json');
			res.send("{success:false}");
		}
	});
};

/*
 * GET remove event
 */
exports.remove = function(req, res) {
	log("event.remove");

	//TODO item removal
	res.send("remove event");
};

/*
 * GET search events
 */
exports.search = function(req, res) {
	log("event.search");

}

/*
 * GET complete event
 */
exports.complete = function(req, res) {
    log("event.complete");

    //TODO event completion
    res.send("complete event");
};

