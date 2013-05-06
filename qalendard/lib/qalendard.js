var schema = require('./schema.js');
var url = require('url');
var qs = require('querystring');

function writeHelp(response,message) {

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(message);
    response.end();
}

var roflInt = 0;

var itemHandler = {
	makeItem: function(request,response) {
        console.log("makeItem");
		var item = new schema.Item();
		item.title = "Test Item "+(roflInt++);
		item.desc = "Test item description";
		item.save();
        writeHelp(response,"{success: true}");
	},
	showItem: function(request,response,reqInfo) {
        console.log("showItem");
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
        console.log("allItems");
		schema.Item.find(function(err,items) {
			if(err) {
				console.log(err);
			} else {
				var str = "{items:"+JSON.stringify(items)+"}";
				writeHelp(response,str);
			}
		});
	},
    editItem: function(request,response,reqInfo) {
        console.log("editItem");
        if(request.method == 'POST') {
        	var body = '';
        	request.on('data', function(data) {
        		body += data;
        	});
        	request.on('end', function() {
        		var POST = qs.parse(body);
        		console.log(POST);
        		var Peval = eval(POST);
        		console.log(Peval);
        		var str = "";
        		str += "id="+POST._id+"\n";
        		str += "title="+POST.title+"\n";
        		str += "desc="+POST.desc+"\n";
        		str += "amount="+POST.amount+"\n";
        		writeHelp(response,str);
        	});
        }
        else {
            writeHelp(response,"{success: true,notReal:true}");
        }
    },
    deleteItem: function(request,response,reqInfo) {
        console.log("deleteItem");

        writeHelp(response,"{success: true}");
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
		else if(reqInfo.pathname.lastIndexOf("/item/edit",0) === 0) {
			// starts with /item/edit
			itemHandler.editItem(request,response,reqInfo);
		}
		else if(reqInfo.pathname.lastIndexOf("/item/delete",0) === 0) {
			// starts with /item/delete
			itemHandler.deleteItem(request,response,reqInfo);
		}
	}
	else {
	    response.writeHead(404, {'Content-Type': 'text/plain'});
	    response.end('Unknown path\n'+request.url);
	}
}





