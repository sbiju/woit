//--------------------------------------------------------------------------------------------------
//	Yocompute 2014-2017 Copyright reserved
//--------------------------------------------------------------------------------------------------
'use strict;'

angular.module('main')

.factory('ItemService', ['$http', 'MainService', function($http, $ms){
	
	var _self = {

		//-------------------------------------------------------------------
		//	Arguments:
		// 		query  [object]
		//	Return:
		//		promise object
		getItems: function( query ){			
			var s = query ? $ms.toQueryStr(query) : null;
			if(s){
				return $http.get( cfg.API_URL + 'items' + s );
			}else{
				return $http.get( cfg.API_URL + 'items');
			}
		},

		//-------------------------------------------------------------------
		//	Arguments:
		// 		user  [object]
		//	Return:
		//		promise object
		saveItem: function( item ){
			return $http.post( cfg.API_URL + 'items', item); // {'token':token, 'query':query}
		},


		offer: function(buyer, item, price){
			return $http.post( cfg.API_URL + 'offers', {'buyer':buyer, 'item':item, 'price':price});
		}
	}

	return _self;
}])