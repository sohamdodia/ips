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

/*
sessionCounter = {
	'IP address' : Number of tabs open from same ip
};
*/
sessionCounter = {};

//Get IPs
function getIPsFromSessionCounter (sessionCounter) {
	var keys = Object.keys(sessionCounter);
	var validIPs = [];
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		if (sessionCounter[key] > 0) {
			validIPs.push(key);
		}
	}
	return validIPs;
}

io.on('connection', (socket) => {

	//Get client IP who is recently connected.
	var clientIP = socket.request.connection.remoteAddress;
	clientIP = clientIP.replace(/^.*:/, '');

	//Check if client IP already exist in sessionCounter or not
	if (typeof sessionCounter[clientIP] === 'undefined') {
		sessionCounter[clientIP] = 1;
	} else {
		sessionCounter[clientIP] += 1;
	}

	//Send IP list to all connected user.
	io.emit('ips', getIPsFromSessionCounter(sessionCounter));

	socket.on('disconnect',() => {

		//Get client IP who is recently disconnected.
		var removeClientIP = socket.request.connection.remoteAddress;
		removeClientIP = removeClientIP.replace(/^.*:/, '');

		//Remove client IP from sessionCounter
		if (typeof sessionCounter[removeClientIP] !== 'undefined') {
			if (sessionCounter[removeClientIP] <= 1) {
				delete sessionCounter[removeClientIP];
			} else {
				sessionCounter[removeClientIP] -= 1;
			}
		}

		//Send IP list to all connected user.
		io.emit('ips', getIPsFromSessionCounter(sessionCounter));
	});
});

server.listen(port,() => {
	console.log(`Server is up on port : ${port}`);
});