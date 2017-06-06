//--------------------------------------------------------------------------------------------------
//	Yocompute 2014-2017 Copyright reserved
//--------------------------------------------------------------------------------------------------
'use strict;'

angular.module('main')

.factory('AuthService', ['$rootScope', '$http', '$q', function($rootScope, $http, $q){


	//----------------------------------------------------------------------
	// success -- cb( Anything data, String textStatus, jqXHR jqXHR )
	// error -- cb( jqXHR jqXHR, String textStatus, String errorThrown )
	function postSync(url, data, success, error){
		$.ajax( url, {
			'method':'POST',
			'async':false,
			'cache':false,
			'dataType':'JSON',
			'data':data,
			'success': success,
			'error': error
		})
	}
	
	var _self = {
		
		//-------------------------------------------------------------------------------------------
		// encrypt  	Use to encrypt password before sending to the server. 
		// 				I use RSA method of https://github.com/travist/jsencrypt by default.
		// 				To use different encrypt method you need to overwrite this function.
		// Arguments:
		// 		text --- string to be encrypted
		// Return:	encrypted string if success, otherwise return null
		encrypt: function( text ){
			var _crypt = new JSEncrypt();
			_crypt.setPublicKey(cfg.pubKey);
			var ret = _crypt.encrypt(text);
			if(ret == false)
				return null;
			else
				return ret;
		},
				
		//-------------------------------------------------------------------
		//	Arguments:
		// 		account  [string] username or email
		//		password [string] password
		//	Return:
		//		promise object
		login: function( account, password ){
			//var encryptedPass = _self.encrypt(password);
			return $http.post(	cfg.API_URL + 'login', {'account': account, 'password': password});
		},

		//-------------------------------------------------------------------
		//	Arguments:
		// 		user [User]
		//	Return:
		//		promise object
		signup: function( user ){
			//user.password = _self.encrypt(user.password);
			return $http.post(	cfg.API_URL + 'signup', user );
		},

		//-------------------------------------------------------------------
		//	Arguments:
		// 		account  [string] email
		//	Return:
		//		promise object
		resetPassword: function( email ){
			return $http.post(	cfg.API_URL + 'resetPassword', {'email':email});
		},

		//-------------------------------------------------------------------
		//	Arguments:
		// 		account  [string] username or email
		//		password [string] new password
		//	Return:
		//		promise object
		updatePassword: function( account, password ){
			var encryptedPass = encrypt(password);
			return $http.post(	cfg.API_URL + 'updatePassword', {'account': account, 'password': encryptedPass});
		},



		hasInvalidChar: function (value) {
			var pattern = /[\/\\:\*\?\"<>\|]/g;
			return pattern.test(value);
		},

		isLoggedIn: function(){
			var val =  sessionStorage.getItem(sessionPrefix + '.user');
			var user = JSON.parse(val);
			if(user)
				return user.loggedIn;
			else
				return false;
		},
		setUsername:function(val){
			sessionStorage.setItem('feizailin.username', val);
		},
		getUsername:function(){
			return sessionStorage.getItem('feizailin.username');
		},
		setId:function(val){
			sessionStorage.setItem('feizailin.userId', val);
		},
		getId:function(){
			return sessionStorage.getItem('feizailin.userId');
		},
		getUser: function(){
			var val =  sessionStorage.getItem(sessionPrefix + '.user');
			return JSON.parse(val);
		},
		setUser: function(user){
			var val = JSON.stringify(user);
			sessionStorage.setItem(sessionPrefix + '.user', val);
		},
		isAdminLogin: function(){
			var val =  sessionStorage.getItem(sessionPrefix + '.user');
			var user = JSON.parse(val);
			if(user==null){
				return false;
			}else{
				return user.username == 'sa' && loggedIn;
			}
		},
		/*,
		getSession:function(){
			$http.get(RESTFUL_URL + '/sessions?_id=' + _id).success(
					function(data, status, headers, config) {
					
					})
					.error(
					function(data, status, headers, config) {
							console.log('get item failed');
					});
		}*/

		hasInvalidChar: function(v){
    			var pattern = /[\/\\:\*\?\"<>\|]/g;
	        	return pattern.test(v);
		},
		accountExistSync: function(account){
			var url = cfg.apiUrl + '/accountExist';
			var bExist = false;

			
			postSync( url, { 'account': account }, function(data, status, jqXHR){
				bExist = data;
			});

			return bExist;
		},
		isEmail: function( value ) {
			// From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
			return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
		},
		emailExistSync: function(account){
			var url = cfg.apiUrl + '/emailExist';
			var bExist = false;

			postSync( url, { 'account': account }, function(data, status, jqXHR){
				bExist = data;
			});

			return bExist;
		},
		usernameExistSync: function(username){
			var url = cfg.apiUrl + '/usernameExist';
			var bExist = false;

			postSync( url, { 'username': username }, function(data, status, jqXHR){
				bExist = data;
			});

			return bExist;
		},
		passwordTooSimple: function(value){
			// Min 6 chars to 32 chars, with number, lowercase and uppercase
			// var re = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,32}/;
			// return !re.test(value);
			return !(value.length > 3 && value.length < 32);
		}

	};

	return _self;

}]);
