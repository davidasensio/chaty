var socket;

/*
$(document).ready(function() {
    // socket = io.connect('http://localhost:8080', {'transports':['websocket', 'polling']});
    //socket = io.connect('http://localhost:8080');
    socket = io.connect( "http://localhost:8080/", { secure: true, transports: [ "flashsocket","polling","websocket", "htmlfile" ] } );
    //socket = socket.socket;
    socket.on('connect', addUser);
    socket.on('updatechat', processMessage);
    socket.on('updateusers', updateUserList);
    $('#datasend').click(sendMessage);
    $('data').keypress(processEnterPress);
});
*/

$(document).ready(function() {
        //socket = io.connect('ws://localhost:8080', {'forceNew':true});
        socket = io();
        // socket.on('messages', function(data) {
        //     console.log(data);
        // });
        //socket = socket.socket;
        socket.on('connect', addUser);
        socket.on('updatechat', processMessage);
        socket.on('updateusers', updateUserList);
        $('#datasend').click(sendMessage);
        $('data').keypress(processEnterPress);
});

function addUser() {
    //var user = prompt('What\'s yout name?');
    //user = user || 'annonimous';
    var user = 'User ' + Math.round((Math.random() * 100));
    socket.emit('adduser', user);
}

function processMessage(username, data) {
    $('<b>' + username + ':</b>' + data + '<br />').insertAfter($('#conversation'));
}

function updateUserList(data) {
    $('#users').empty();
    $.each(data, function(key, value) {
        $('#users').append('<div>' + key + '</div>');
    });
}

function sendMessage() {
    var message = $('#data').val();
    $('#data').val('');
    socket.emit('sendchat', message);
    $('#data').focus();
}

function processEnterPress(e) {
    if (e.which === 13) {
        e.preventDefault();
        $(this).blur();
        $('#datasend').focus().click();
    }
}
