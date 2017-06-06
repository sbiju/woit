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
		setUsers : function(users){
			_users = users;
		},

		getUser : function(id){
			for(var i=0; i<_users.length;i++){
				if(_users[i]._id == id){
					return _users[i];
				}
			}
			return null;
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
		// getAccount
		// Arguments: None
		getAccount: function(token, cb){
			$http.post(cfg.apiUrl + '/getAccount', {'token': token}).success(function (data) {
			    	if(data.success){
	                    if(cb)
	                    	cb(data.account);
			    	}else{
						if(cb)
							cb(data.account);
			    	}
				}).error(function(data, status, header, config){
					if(cb)
						cb(data.account);
				});
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
		
		
		//------------------------------------------------------------------------------------------
		// 	Convert the query object to string.
		//	Arguments: 
		//		query --- query object of mongodb format. eg. { item_id: itemId }
		//	Return:
		//		string of the query, eg. firstname=a&lastname=b
		//------------------------------------------------------------------------------------------
		toQueryStr: function(query){
			var list = [];
			if( !_.isEmpty(query) ){
				_.each(query, function(val, key){
					list.push(key + '=' + val);
				});
				return list.join('&');
			}
			return '';
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

		

		// dir --- username
		getPhotos: function(dir, cb){
			$http.post(cfg.apiUrl + '/getUploads', {'dir': dir, 'type':'pic'})
				.success(function (data) {

					if(cb)
						cb(data.docs);
					
				}).error(function(){
					console.log('getPhotos --- Exception.');
				});
		},

		// query --- {'dir': dir, 'type':'pic'}
		rmPhoto: function(query, cb){
			$http.post(cfg.apiUrl + '/rmPhoto', query)
				.success(function (data) {

					if(cb)
						cb(data.doc);
					
				}).error(function(){
					console.log('mrPhoto --- Exception.');
				});
		},

		getProfiles: function(username, cb){
			$http.post(cfg.apiUrl + '/getProfiles', {'username': username})
				.success(function (data) {

					if(cb){
						cb(data.profiles);// if not found return []
					}
					
				}).error(function(){
					console.log('getPhotos --- Exception.');
				});
		},

		saveProfile:function(profile, cb){
			$http.post(cfg.apiUrl + '/saveProfile', profile).success(
				function(data, status, headers, config) {
					if (data.error && data.error.length > 0) {
						console.log('fail: save profile.')
					}else{
						if(cb)
							cb(data.profile);
					}
				}).error(
					function(data, status, headers, config) {
						//By pass
				});
		},

		// updates: eg. {status: 0, created:ISODate() }
		updateProfile:function(query, updates, cb){
			$http.post(cfg.apiUrl + '/updateProfile', {'query':query, 'updates': { $set: updates }}).success(
				function(data, status, headers, config) {
					if (data.success) {
						if(cb)
							cb(data.results);
					}else{
						console.log('fail: update profile.');
					}
				}).error(
					function(data, status, headers, config) {
						//By pass
				});
		},

		getAge: function(birthday){
			if(birthday){
				var y = birthday.split('-')[0];
				var cy = new Date().getFullYear();
				return parseInt(cy) - parseInt(y);
			}else{
				return -1;
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

		postMeet: function(msg, successCb, failCb){
		    $http.post(cfg.apiUrl + '/saveMeet', msg).success(function () {
                if(successCb)
                	successCb();
			}).error(function(){
				if(failCb)
					failCb();
			});
		},

		//--------------------------------------------------------------------------------------
		// getMesets 
		// Arguments:
		// 		query --- query object
		// Return:
		//		{ success: true, meets: docs}
		getMeets( query, successCb, failCb){
			var token = _self.getSessionItem('token');
		    $http.post(cfg.apiUrl + '/getMeets', {'token': token, 'query': query}).success(function (data) {
		    	if(data.success){
                    if(successCb)
                    	successCb(data.meets);
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

