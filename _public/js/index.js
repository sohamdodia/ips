var socket = io();

socket.on('connect', function () {
	console.log('Connected');
	// socket.emit('createMessage',{
	// 	message : 'Message from server'
	// });
});

socket.on('ips' ,function(ips) {
	// console.log(ips);
	$('body').append('<div>' + ips +'</div>');
});

// socket.emit('createMessage',{
// 	from : 'Frank',
// 	text : 'Hey'
// },function(data) {
// 	console.log('Got it',data);
// });
socket.on(	'disconnect',function () {
	console.log('disconnect');
});