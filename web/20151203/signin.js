var path = require('path');
var requestHandlers = require("./requestHandlers");
var server = require("./server");
var s = require("./set");

server.start(s.set);


