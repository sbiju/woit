//--------------------------------------------------------------------------------------------------
//	Yocompute 2014-2017 Copyright reserved
//--------------------------------------------------------------------------------------------------
'use strict;'

angular.module('main')

.factory('UserService', ['$http', 'MainService', function($http, $ms){
	
	var _self = {

		//-------------------------------------------------------------------
		//	Arguments:
		// 		query  [object]
		//	Return:
		//		promise object, $.param() is not jqLite
		getUsers: function( query ){
			var s = query ? $ms.toQueryStr(query) : null;
			if(s){
				return $http.get( cfg.API_URL + 'users' + s );
			}else{
				return $http.get( cfg.API_URL + 'users');
			}
		},

		//-------------------------------------------------------------------
		//	Arguments:
		// 		user  [object]
		//	Return:
		//		promise object
		saveUser: function( user ){
			return $http.post( cfg.API_URL + 'users', user);
		},

		//-------------------------------------------------------------------
		//	Arguments:
		// 		query  [object] username or email
		//	Return:
		//		promise object
		getAccount: function( query ){
			return $http.get( cfg.API_URL + 'accounts?account=' + query.account );
		},

		//-------------------------------------------------------------------
		//	Arguments:
		// 		query  [object] 
		//	Return:
		//		promise object
		getProfiles: function(query){
			var s = query ? $ms.toQueryStr(query) : null;
			if(s){
				return $http.get( cfg.API_URL + 'profiles' + s );
			}else{
				return $http.get( cfg.API_URL + 'profiles');
			}
		},

		//-------------------------------------------------------------------
		//	Arguments:
		// 		query  [object] profile
		//	Return:
		//		promise object
		saveProfile:function(profile){
			return $http.post( cfg.API_URL + 'profiles', profile);
		},

		//-------------------------------------------------------------------
		//	Arguments:
		// 		query  [object]
		//		updates [object]
		//	Return:
		//		promise object
		updateProfile:function(query, updates){
			return $http.put( cfg.API_URL + 'profiles', {'query':query, 'updates': updates} );
		},


		getPhotos: function(path){

		},

		rmPhoto: function(query){
		
		},

		//-------------------------------------------------------------------
		//	Arguments:
		// 		birthday  [string]
		//	Return:
		//		promise object
		birthdayToAge: function(birthday){
			if(birthday){
				var y = birthday.split('-')[0];
				var cy = new Date().getFullYear();
				return parseInt(cy) - parseInt(y);
			}else{
				return -1;
			}
		},

	}

	return _self;
}])