//--------------------------------------------------------------------------------------------------
//	Yocompute 2014-2017 Copyright reserved
//--------------------------------------------------------------------------------------------------
'use strict'

var mode = "developement";
var project = 'woit';
var user = 'webuser';

var rootPath = '/home/' + user + '/apps/'+ project +'/';

if(mode=="production"){
	rootPath = '/home/' + user + '/apps/'+ project +'/';
}else{
	rootPath = 'c:/workspace/' + project +'/';
}

var expiry = 30 * 60 * 1000;

module.exports = {
	port:5001,
	sessionPrefix: project,
	sessionExpiry: expiry, // milliseconds
	sendgrid:{
		username:'myusername',
		password:'mypassword'
	},
	passResetEmail: 'MyPasswordService@MyDomain.com',
	jwt:{
		secret: 'myusername_hmacsha256',
		algorithm: 'HS256',
		expiresInSeconds: expiry / 1000
	},
	privateKeyPath: rootPath + 'server/rsa_1024_priv.pem'
}
