var schema = require('../schema');

function log(msg,err) {
	// do nothing
	if(err) {
		console.log(msg,err);
	}
}

/*
 * GET items listing.
 */
exports.list = function(req, res){
	log("item.list");
	schema.Item.find(function(err,items) {
		if(err) {
      log("item.list error:",err);
		} else {
			var str = "{items:"+JSON.stringify(items)+"}";
			res.set('Content-Type', 'application/json');
			res.send(str);
		}
	});
    //res.send("respond with a resource");
};

/*
 * GET single item
 */
exports.show = function(req, res) {
	log("item.show");
	var id = req.param('id');
	if(!id) {
		id = req.param('_id');
	}
	if(!id) {
		res.send("{success:false}");
	} else {
		schema.Item.findOne({_id: id}, function(err,item) {
			if(err) {
				log("item.show error: ",err);
				res.set('Content-Type', 'application/json');
				res.send("{success:false}");
			} else {
				var str = "{items:"+JSON.stringify(item)+"}";
				res.set('Content-Type', 'application/json');
				res.send(str);
			}
		});
	}
	//res.send("show item");
};

/*
 * POST create item
 */
exports.create = function(req, res) {
	log("item.create");
	var values = req.body;
	delete values._id;
	var item = new schema.Item(values);
	item.save(function(err,updated) {
		if(err) {
			log("item.save error: ",err);
			res.send("{success:false}");
		} else {
			res.send("{success:true,items:"+JSON.stringify(updated)+"}");
		}
	});
};

/*
 * POST edit item
 */
exports.edit = function(req, res) {
	log("item.edit");
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
	schema.Item.findByIdAndUpdate(id, update, function(err,item) {
		if(err) {
			log("item.edit error: ",err);
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
 * GET remove item
 */
exports.remove = function(req, res) {
	log("item.remove");

  //TODO item removal
	res.send("remove item");
};

/*
 * GET complete item
 */
exports.complete = function(req, res) {
    log("item.complete");

    //TODO item completion
    res.send("complete item");
};

