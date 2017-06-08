//--------------------------------------------------------------------------------------------------
//	Yocompute 2014-2017 Copyright reserved
//--------------------------------------------------------------------------------------------------
angular.module('main',[])

//.factory('MainService', ['$translate','$http', function($translate, $http){
.factory('MainService', ['$http', '$location', function($http, $location){
	
	var _users = [];



	// deprecated
	function getOrientation(){
		return window.screen.width > window.screen.height? 'landscape' : 'portrait';
	}
	
	// deprecated
	function inMobile(){
		return window.screen.width < 768 || window.screen.height < 768;
	}
	

	var _self = {
		//------------------------------------------------------------------------------------------
		// 	Convert the query object to string. jqLite does not have param() function, we need it
		//	Arguments: 
		//		query 	--- Query object. eg. { item_id: itemId }
		//	Return:
		//		string of the query if success, eg. ?reviewer=a&reviewee=b; otherwise return ''
		toQueryStr: function(query){
			var list = [];
			if( query ){
				var keys = Object.keys(query);
				if(keys.length == 0){
					return "";
				}else{
					for(var key in query){
						if(query.hasOwnProperty(key)){
							list.push(key + '=' + query[key]);
						}
					}
					return '?' + list.join('&');
				}
			}else{
				return '';
			}
		},

		//--------------------------------------------------------------------------------------
		// getSessionItem
		//	name --- name of session item 
		//--------------------------------------------------------------------------------------
		getSessionItem : function( name ){	
			var s = sessionStorage.getItem( cfg.sessionPrefix + name);
			if (s=='null')
				return null;
			try {
				if(s){
					return JSON.parse(s);
				}else{
					return s;
				}
		    } catch (e) {
		        return s;
		    }
		},
		
		//--------------------------------------------------------------------------------------
		// setSessionItem
		//	name --- name of session item
		// 	obj --- object that can be convert to json string  
		//--------------------------------------------------------------------------------------
		setSessionItem : function( name, obj ){
			if( typeof obj == 'undefined'){
				sessionStorage.setItem( cfg.sessionPrefix + name, null );
			}else if(typeof obj == 'string'){
				sessionStorage.setItem( cfg.sessionPrefix + name, obj);
			}else{
				if(obj)
					sessionStorage.setItem( cfg.sessionPrefix + name, JSON.stringify(obj));
				else
					sessionStorage.setItem( cfg.sessionPrefix + name, obj);
			}
		},
	
		//--------------------------------------------------------------------------------------
		// getLocalItem
		//	name --- name of session item 
		//--------------------------------------------------------------------------------------
		getLocalItem : function( name ){	
			var s = localStorage.getItem( cfg.sessionPrefix + name);
			if (s=='null')
				return null;
			try {
				if(s){
					return JSON.parse(s);
				}else{
					return s;
				}
		    } catch (e) {
		        return s;
		    }
		},
		
		//--------------------------------------------------------------------------------------
		// setLocalItem
		//	name --- name of session item
		// 	obj --- object that can be convert to json string  
		//--------------------------------------------------------------------------------------
		setLocalItem : function( name, obj ){
			if( typeof obj == 'undefined'){
				localStorage.setItem( cfg.sessionPrefix + name, null );
			}else if(typeof obj == 'string'){
				localStorage.setItem( cfg.sessionPrefix + name, obj);
			}else{
				if(obj)
					localStorage.setItem( cfg.sessionPrefix + name, JSON.stringify(obj));
				else
					localStorage.setItem( cfg.sessionPrefix + name, obj);
			}
		},

		

		//-------------------------------------------------------------------------------------------
		// checkToken  	check if token is valid
		// Arguments:
		// 		cb --- callback function(bValid), bValid if token is valid
		checkToken: function(cb){
			var token = _self.getSessionItem('token');
			if(token){
				$http.post(cfg.apiUrl + '/checkToken', {'token':token}).success(
					function(data, status) {
						if(cb)
							cb(data.success);
					}).error(
						function(data, status, headers, config) {
							if(cb)
								cb(false);
							
					});
			}else{
				if(cb)
					cb(false);
			}
		},

		changeLanguage: function(lang){
			// if(lang=='en'){
				// $translate.use('en_US');
			// }else if(lang=='zh_CN'){
				// $translate.use('zh_CN');
			// }else{
				// $translate.use('zh_CN');
			// }
		},
		
		inMobile: function(){
			return inMobile();
		},
		
		
		getObjectId:function(successCb, failCb){
			$http.get(RESTFUL_URL + '/object_id').success(
					function(data, status, headers, config) {
						if(successCb){
							successCb(data._id);
						}
					}).error(
					function(data, status, headers, config) {
						console.log('[failed] -- Get object id');
						if(failCb){
							failCb(null);
						}
					});
		},
		
		
		resize: function(){
			var orientation = getOrientation();
			if(inMobile()){
				if(orientation == 'portrait'){
					if(window.innerWidth < 768){
						$('.page-content').height(window.innerHeight - $('.footer').height() - $('.nav-menus').height()- 40);						
					}else{
						$('.page-content').height(window.innerHeight - $('.footer').height() - $('.nav-menus').height()- 70);										
					}
				}	
			}else{
				$('.page-content').height(window.innerHeight - $('.footer').height() - $('.nav-menus').height() - 70);						
			}
		},
		
		
		securePost: function(url, options, successCb, errorCb){
			var token = this.getSessionItem('token');
			if(token){
				$http.post(cfg.apiUrl + url, $.extend({'token':token}, options) )
				.success(function(data, status, headers, config) {
					if(data.token){
						this.setSessionItem('token', data.token);
					}
					
					if(!data.success){
						// if(window.location.hash=='#/propertyList'){
							// $location.path('/signin');
						// }
					}

					if(successCb){
						successCb(data, status, headers, config);
					}
				})
				.error(errorCb);
			}else{
				if(errorCb){
					errorCb(null, null, null, null);
				}
			}
		},
		
		
		getDateTimeString : function(dt){
			if(dt){
				var s = dt.split('GMT-');
				return s[0].trim();
			}else{
				return '5 minutes ago';
			}
		},

		postMessage: function(msg, successCb, failCb){
		    $http.post(cfg.apiUrl + '/saveMessage', msg).success(function () {
                
                if(successCb)
                	successCb();
			}).error(function(){
				if(failCb)
					failCb();
			});
		},
		//--------------------------------------------------------------------------------------
		// get  --- get messages between me and selected user
		// Arguments:
		// 		query --- query object, eg {$or:[{'from':from, 'to': to}, {'from':to, 'to':from}]};
		// Return:
		//		{ success: true, messages: docs}
		getMessages( query, successCb, failCb){
			var token = _self.getSessionItem('token');
		    $http.post(cfg.apiUrl + '/getMessages', {'token': token, 'query': query}).success(function (data) {
		    	if(data.success){
                    if(successCb)
                    	successCb(data.messages);
		    	}else{
					if(failCb)
						failCb();
		    	}
			}).error(function(){
				if(failCb)
					failCb();
			});
		},
	}

	return _self;
}])

