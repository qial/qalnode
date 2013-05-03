var schema = require('./schema.js');
var url = require('url');

function writeHelp(response,message) {

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(message);
    response.end();
}

var roflInt = 0;

var itemHandler = {
	makeItem: function(request,response) {
		var item = new schema.Item();
		item.title = "Test Item "+roflInt;
		item.desc = "Test item description";
		item.save();
		writeHelp(response,"Made item.");

	},
	showItem: function(request,response,reqInfo) {
		var tmp = reqInfo.pathname.split("/item/show/");
		var id = tmp[tmp.length-1];
		schema.Item.find(function(err,items) {
			if(err) console.log(err);
			console.log(items);
		});
		schema.Item.findById(id,function (err,items) {
			if(!err) {
				// do something?
			    writeHelp(response,"Found item!");
			} else {
				writeHelp(response,"Error!\n");
				//response.write(err);
			}
		});
	},
	allItems: function(request,response) {
		schema.Item.find(function(err,items) {
			if(err) {
				console.log(err);
			} else {
				var str = "{items:"+JSON.stringify(items)+"}";
				writeHelp(response,str);
			}
		});
	}
};

exports.server = function (request, response) {
	var reqInfo = url.parse(request.url);
	if(reqInfo.pathname.lastIndexOf("/item",0) === 0) {
		// starts with /item
		if(reqInfo.pathname.lastIndexOf("/item/new",0) === 0) {
			// starts with /item/new
			itemHandler.makeItem(request,response);
		}
		else if(reqInfo.pathname.lastIndexOf("/item/show",0) === 0) {
			// starts with /item/show
			itemHandler.showItem(request,response,reqInfo);
		}
		else if(reqInfo.pathname.lastIndexOf("/items",0) === 0) {
			// starts with /items
			itemHandler.allItems(request,response);
		}
	}
	else {
	    response.writeHead(404, {'Content-Type': 'text/plain'});
	    response.end('Unknown path\n'+request.url);
	}
}





