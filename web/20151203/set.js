var fs = require("fs");
var querystring = require("querystring");
var requestHandler = require("./requestHandlers");
var path = require("path");

function set(pathname, response, post_data, query) {
	if ((pathname == "/")||(pathname == "/localhost:8000")) {
		var data = fs.readFileSync("all.txt", {encoding: "utf-8"});
		var info = querystring.parse(data);
		//console.log("info00: "+typeof info);
		var params = querystring.parse(post_data);
		//console.log(post_data);
		//console.log("params: "+params.username);
	}


	if ((post_data != "")&&((pathname == "/")||(pathname == "/localhost:8000"))) {
		requestHandler.judge_exist(data, post_data, params, info, response);
	}
	if (post_data == "") {
	   if (path.basename(pathname) == 'form.js') {
    		fs.readFile("form.js", {encoding: "utf-8"}, function(err, data) {
        		if (err) throw err;
        		else {
            		response.writeHead(200, {'Content-Type': 'text/javascript'});
            		response.write(data);
            		response.end();
             	}
    		});
    	}
    	else if (path.basename(pathname) == 'form.css') {
    		fs.readFile("form.css", {encoding: "utf-8"}, function(err, data) {
        		if (err) throw err;
        		else {
            		response.writeHead(200, {'Content-Type': 'text/css'});
            		response.write(data);
            		response.end();
           		}
    		});
    	}
    	else {
			if (typeof query.username == 'undefined') {
				requestHandler.start(response);
			}
			else {
				if (typeof info != 'undefined') {
					if (typeof info.username == 'object') {
						var user = {};
						if (info.username.indexOf(query.username) != -1) {
							user.username = query.username;
							user.number = info.number[info.username.indexOf(query.username)];
							user.tel = info.tel[info.username.indexOf(query.username)];
							user.email = info.email[info.username.indexOf(query.username)];

							requestHandler.details(response, user);
						}
						else requestHandler.start(response);
					} else if (typeof info.username == 'string') {
						if (info.username == query.username) requestHandler.details(response, info);
						else requestHandler.start(response);
					}
				}
				else requestHandler.start(response);
			}
		}
	} 
}

exports.set = set;