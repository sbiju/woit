//--------------------------------------------------------------------------------------------------
//	Yocompute 2014-2017 Copyright reserved
//--------------------------------------------------------------------------------------------------
'use strict';

var http = require('http');
var cfg = require('./config');
var express = require("express"),
	app = express(),
	port = parseInt(process.env.PORT,10) || cfg.port;

// body-parser does not handle multipart bodies
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }));

// parse application/json
app.use(bodyParser.json({ limit: '1mb' }));

app.use(express.static(__dirname + '/../app'));

//----------------------------------------------------------------------------------------
// The cookie parser used before the session, this order is required for sessions to work.
// By default maxAge is null, meaning the cookie becomes a browser-session cookie, that is 
// when the user closes the browser the cookie (and session) will be removed.
// path --- cookie path
// expire --- absolute expiration date (Date object)
// maxAge --- relative max age of the cookie from when the client receives it (mill seconds)
// secure --- true or false
// domain --- domain for the cookie
// httpOnly --- true or false
//-----------------------------------------------------------------------------------------
app.use(cookieParser('S3CRE7', {maxAge: 1200*1000}));

//----------------------------------------------------------------------------------------
// Use conect-redis, session set up
// host 	--- Redis server host name
// prefix 	--- Key prefix default "sess"
// ttl		--- expiration in seconds
//----------------------------------------------------------------------------------------
app.use(session(
	{
	secret: 'my secrete salt',
	resave: false,
	saveUninitialized:true,
	cookie:{
		secure:false, // true will update session ID for every page refresh 
		maxAge: cfg.sessionExpiry // 15 minutes	
	},
    proxy: false //true, if you do SSL outside of node.
}))

//------------------------------------------------------------------------------------------
// server start
//------------------------------------------------------------------------------------------
var serv = http.createServer(app).listen(port, function(){
	console.log('Now serving the app at http://localhost:' + port + '/app');
});

// var io = require('socket.io').listen(serv);

// io.sockets.on('connection', function(socket) {
//     socket.on('message-server', function(data) { //{'text':text, 'dt':dt, 'from':from, 'to':to}
//         io.sockets.emit("message-" + data.to, data);
//     });
// });