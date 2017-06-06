//--------------------------------------------------------------------------------------------------
//	Yocompute 2014-2017 Copyright reserved
//--------------------------------------------------------------------------------------------------
'use strict';


var SESSION_TIMEOUT = 20 * 60 * 1000;

angular.module('main')

.controller('LoginController',[
				'$scope',
				'$rootScope',
				'$http',
				'$location',
				'$timeout',
				'AuthService', 'MainService',
				function($scope, $rootScope, $http, $location, $timeout, $auth, $ms) {
					
					var Error = {
							NONE:0,
							ACCOUNT_NOT_EXIST:1,
							PASSWORD_MISMATCH:2,
							ACCOUNT_EMPTY:3,
							EMAIL_EMPTY:4,
							INVALID_EMAIL:5,
							EMAIL_EXISTS:6,
							USERNAME_EMPTY:7,
							PASSWORD_EMPTY:8,
							PASSWORD_TOO_SIMPLE:9,
							ENCRYPT_PASSWORD_EXCEPTION:10,
							UPDATE_USER_EXCEPTION:11
					};
					
					//$ms.resize();
					

					 // remember:true};
					$scope.error = {account:'', password:''};
					
					$scope.$watch("account", function(newVal, oldVal){
						if(newVal){
							$scope.error.account = "";
						}
					});
					
					$scope.$watch("password", function(newVal, oldVal){
						if(newVal){
							$scope.error.password = "";
						}
					});
					
					
					$scope.submit = function() {
						//cleanErrorMessage();

						$auth.login($scope.account, $scope.password).then(function(d){
							
							if(d.data.token){
								var user = JSON.parse(d.data.users)[0];
								$rootScope.$broadcast("OnUpdateHeader",{'loggedIn':true});
								$ms.setSessionItem('token', d.data.token);
								$ms.setSessionItem('user', user);
								//$ms.setSessionItem('user', data.decoded);
								$location.path('/items');
							}
						})	

					}// End of submit()
				

					
				  $scope.$on("onCountDownLogoutDialog", function(event,args){
						/*$timeout(function(){
							$scope.openLogoutDialog();
						}, SESSION_TIMEOUT);*/
				  });

				  
				  	//---------------------------------------------------------------------------
					// Private methods
					//---------------------------------------------------------------------------
				  	function loginSuccessHdlr(data){
						$ms.setSessionItem('token', data.token);
						//$ms.setSessionItem('user', data.decoded);
						$rootScope.$broadcast("OnUpdateHeader");
						startTokenRefreshTask();
						
						if(data.decoded.username == 'admin'){
							$location.path('/admin');
						}else{
							$location.path('/');
						}
				  	}
				  
					function cleanErrorMessage(){
						$scope.error.account = "";
						$scope.error.password = "";
					}
					
					function setErrorMessage(errors){

						if(errors.indexOf(Error.ACCOUNT_EMPTY) != -1){
							$scope.error.account = "Please enter the username or email you signed up.";
						}else{
							if(errors.indexOf(Error.ACCOUNT_NOT_EXIST) != -1){
								$scope.error.account = "Username or email does not exist, please try another.";
							}else{
								$scope.error.account = "";
							}
						}
						
						if(errors.indexOf(Error.PASSWORD_MISMATCH) != -1){
							$scope.error.password = "The password is incorrect.";
						}else{
							$scope.error.password = "";
						}
					}
					
					function startTokenRefreshTask(){
						var t = $ms.getSessionItem('token');
						
						if(t){
							var tokenInterval = setInterval(function(){
								var token = $ms.getSessionItem('token');
								$ms.renewToken(token, function(newToken, errMsg){
									if(newToken){
										$ms.setSessionItem('token', newToken);
									}else{
										var tokenInterval = $ms.getSessionItem('tokenInterval');
										clearInterval(tokenInterval);
										
										//if(loggedIn)
											//alert(errMsg);
									}
								})
							}, 4*60000);
						
							$ms.setSessionItem('tokenInterval', tokenInterval);
						}
					}

					function init(){
						$scope.account = '';
						$scope.password = '';
					}

					init();
					
				} ])	

