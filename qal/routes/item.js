require('../schema');

/*
 * GET items listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

/*
 * GET single item
 */
exports.show = function(req, res) {
	res.send("show item");
};

/*
 * POST create item
 */
exports.create = function(req, res) {
	res.send("create item");
};

/*
 * POST edit item
 */
exports.edit = function(req, res) {
	res.send("edit item");
};

/*
 * GET remove item
 */
exports.remove = function(req, res) {
	res.send("remove item");
};

