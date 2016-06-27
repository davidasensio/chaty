/*
Chaty: a chat app made by Hackatoners
*/

var app = app || {};
(function() {
    this.login= new Login();
    this.register = new Register();
    this.streams = new Streams();
    this.streamsCreator = new StreamCreator();
    this.leftPanel = new LeftPanel();


    // login.login('user', '****');

}).call(app);
