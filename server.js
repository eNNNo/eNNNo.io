var connect = require('connect'),
	port = 8000;

connect.createServer(
    connect.static(__dirname)
).listen(port);

console.log("Server running on localhost:"+port)