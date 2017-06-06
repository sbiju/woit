//--------------------------------------------------------------------------------------------------
//	Yocompute 2014-2017 Copyright reserved
//--------------------------------------------------------------------------------------------------
'use strict;'

angular.module('main')

.factory('UserService', ['$rootScope', '$http', function($rootScope, $http){
	
	var _self = {

		//-------------------------------------------------------------------
		//	Arguments:
		// 		query  [object]
		//	Return:
		//		promise object
		getUsers: function( query ){
			var s = query ? $.param(query) : null;
			if(s){
				return $http.get( cfg.API_URL + 'users?' + s );
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
			return $http.post( API_URL + 'users'); // {'token':token, 'query':query}
		},

		//-------------------------------------------------------------------
		//	Arguments:
		// 		query  [object] username or email
		//	Return:
		//		promise object
		getAccount: function( query ){
			return $http.get( cfg.API_URL + 'accounts?account=' + query.account );
		},
	}

	return _self;
}])