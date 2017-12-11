//Express
var express = require('express');
var app = express();
var https = require('https');

var http = require('http').createServer(app);
var port = process.env.PORT || 4000;
var server = app.listen(port);
var fs = require('fs');

//ejs
var ejs = require('ejs');

//Sockets
var socket = require('socket.io').listen(server);


//Setup public lib
app.use(express.static(__dirname + '/public'));
//Setup the views folder
app.set("views", __dirname + '/views');

//Setup public lib
app.use(express.static(__dirname + '/public'));
//Setup the views folder
app.set("views", __dirname + '/views');

//Setup ejs, so I can write HTML (:
app.engine('.html', ejs.__express);
app.set('view-engine', 'html');


//Router
app.get("/test", function(req, res){
    res.render("test.html")
});


socket.on('connection', function(client){
    console.log("new connection");
    client.on('test', function(value){
      //do something
      console.log("client sent: "+ value)
    });

    client.on('disconnect', function(){
        numUsers--;
        console.log("A user dissconected.");

    });
});
