const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3001;
const publicPath = path.join(__dirname,'../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

var ips = [];


/*
mapping = {
	'IP address' : Number of tabs open from same ip
};
*/
mapping = {};


function getIPsFromMapping (mapping) {
	var keys = Object.keys(mapping);
	console.log(keys);
	var validIPs = [];
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		if (mapping[key] > 0) {
			validIPs.push(key);
		}
	}
	console.log(validIPs);
	return validIPs;
}

io.on('connection',(socket) => {
	console.log('Connected');
	var clientIp = socket.request.connection.remoteAddress;
	clientIp = clientIp.replace(/^.*:/, '');

	if (typeof mapping[clientIp] === 'undefined') {
		mapping[clientIp] = 1;
	} else {
		mapping[clientIp] += 1;
	}

	// if ((ips.indexOf(clientIp))  < 0) {
	// 	ips.push(clientIp);
	// }

	// // io.emit('ips',ips);

	io.emit('ips', getIPsFromMapping(mapping));

	socket.on('disconnect',() => {
		var remove_clientIp = socket.request.connection.remoteAddress;
		remove_clientIp = remove_clientIp.replace(/^.*:/, '');

		if (typeof mapping[remove_clientIp] !== 'undefined') {
			if (mapping[remove_clientIp] <= 1) {
				// mapping[remove_clientIp] = 0;
				delete mapping[remove_clientIp];
				// Remove the line above this comment
				// and add a new line to remove remove_clientIp key from mapping

			} else {
				mapping[remove_clientIp] -= 1;
			}
			// mapping[remove_clientIp] = mapping[remove_clientIp] <= 1 ? 0 : mapping[remove_clientIp] - 1;
		}

		// if ((ips.indexOf(remove_clientIp))  < 0) {
		// 	ips.pop(remove_clientIp);
		// 	// io.emit('ips',ips);
		// }
		// io.emit('ips',ips);
		io.emit('ips', getIPsFromMapping(mapping));
		console.log('User was disconnected');
	});
});

server.listen(port,() => {
	console.log(`Server is up on port  : ${port}`);
});