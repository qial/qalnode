var http = require('http');
var qalendard = require('./qalendard');

http.createServer(qalendard.server).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');