var http = require("http");
var fs = require('fs');
var url = require('url');
var path = require('path');
var querystring = require("querystring");
var s = require("./set");
var requestHandlers = require("./requestHandlers");
var str = "";

function start(route) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		var query = querystring.parse(url.parse(request.url).query);
		var post_data = "";
		request.setEncoding("utf-8");
		request.addListener("data", function(postDataChunk) { // 接收post
			post_data += postDataChunk;
		});
		request.addListener("end", function() {
			s.set(pathname, response, post_data, query);
		});
	}
	http.createServer(onRequest).listen(8000);
	console.log("Server is listening");
}

exports.start = start;