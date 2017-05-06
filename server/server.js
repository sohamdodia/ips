const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
// const requestIp = require('request-ip');
// app.use(requestIp.mw({attributeName : 'ipAttribute'}));

var ips = [];
// app.use(function(req,res,next()) {
// 	var ip = req.clientIp;
// 	ip = ip.replace(/^.*:/, '')
// 	console.log(ip);
// 	res.send(ip);
// 	next();
// });

// app.get('/',function(req,res) {
// 	console.log('Request Comes');
// 	var ip = req.ipAttribute;
// 	ip = ip.replace(/^.*:/, '');
// 	if ((ips.indexOf(ip))  < 0) {
// 		ips.push(ip);
// 	}
// 	console.log(ips);
// 	res.send(ips);
// });

io.on('connection',(socket) => {
	console.log('Connected');
	var clientIp = socket.request.connection.remoteAddress;
	clientIp = clientIp.replace(/^.*:/, '');
	if ((ips.indexOf(clientIp))  < 0) {
		ips.push(clientIp);
	}

	io.emit('ips',ips);
	socket.on('disconnect',() => {
		clientIp = socket.request.connection.remoteAddress;
		if ((ips.indexOf(clientIp))  < 0) {
			ips.pop(clientIp);
		}
		io.emit('ips',ips);
		console.log('User was disconnected');
	});
});

server.listen(3000,function() {
	console.log('server listing on port 3000');
})