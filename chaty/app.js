var express = require('express'),
	app = express(),
	http = require('http'),
	server = http.createServer(app),
	io = require('socket.io').listen(server);



app.use(express.static(__dirname + '/public'));

// Sample
// app.get('/', function(req, res) {
// 	res.sendfile(__dirname + '/public/sample/index.html');
// });

//Chat window
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

//Chat window
app.get('/chat', function(req, res) {
	res.sendFile(__dirname + '/public/chatwindow.html');
});

// app.get('/', function (request, response) {
	// response.redirect('default.html');
// });

var usernames = {};

io.sockets.on('connection', function(socket) {
    //socket.emit('messages', {id: 1, text:'Holaaaaab', author: 'davasens'});
	socket.on('sendchat', function(data) {
		io.sockets.emit('updatechat', socket.username, data);
	});

	socket.on('adduser', function(username) {
		socket.username = username;
		usernames[username] = username;
		socket.emit('updatechat', 'SERVER', 'you have connected');
		socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected' );
		io.sockets.emit('updateusers', usernames);
	});

	socket.on('disconnect', function() {
		delete usernames[socket.username];
		io.sockets.emit('updateusers', usernames);
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
	});
});

var port = 8080;
server.listen(port, function() {
	console.log('Listening on port: ' + port);
});
