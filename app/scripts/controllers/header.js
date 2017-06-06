//--------------------------------------------------------------------------------------------------
//	Yocompute 2014-2017 Copyright reserved
//--------------------------------------------------------------------------------------------------
'use strict';

angular.module('main')

.controller('HeaderController', [ '$scope', '$rootScope', '$http', '$location', 'MainService', '$mdDialog',
		  function( $scope, $rootScope, $http, $location, $ms, $mdDialog) {


 			var originatorEv;

			this.notificationsEnabled = true;

		    this.toggleNotifications = function() {
		      this.notificationsEnabled = !this.notificationsEnabled;
		    };
			//----------------------------------------------------------------------------------
			// Public methods
			//----------------------------------------------------------------------------------
			$scope.redirectTo = function(a){
				$location.path(a);
			}

			function login(){
				$location.path('login');
			}

			function signup(){
				$location.path('signup');
			}

			function home(){
				$location.path('/');
			}

			function logout(){
				$ms.setSessionItem('token', '');
				$rootScope.$broadcast('OnUpdateHeader', {'loggedIn':false});
				$location.path('/');
			}

			function listing(){
				$location.path('listing');
			}


			function post(){
				$location.path('postMeet');
			}


			$scope.openMessagePage = function(){
				$location.path('message');
			}


			$scope.profile = function(){
				$location.path('profile');
			}

			$scope.admin = function(){
				$location.path('admin');
			}



		    $scope.openMenu = function($mdOpenMenu, ev) {
		      originatorEv = ev;
		      $mdOpenMenu(ev);
		    };
		    
			//----------------------------------------------------------------------------------
			// Events
			//----------------------------------------------------------------------------------
			$scope.$on('OnUpdateHeader', function(e, args){
				var user = $ms.getSessionItem('user');
				$scope.bLoggedIn = args && args.loggedIn;
				$scope.bAdmin = (user && user.username == 'admin');

				init();
			});


			//----------------------------------------------------------------------------------
			// Private methods
			//----------------------------------------------------------------------------------

			//--------------------------------------------------------------------
			// getIndex --- get index of the menu
			// Arguments:
			//	name	--- name of the menu
			function getIndex(name){
				var headers = $scope.header.data;
				for(var i=0; i<headers.length; i++){
					if(headers[i].text == name){
						return i;
					}
				}
				return -1;
			}

			function logout(){
				$ms.setSessionItem('token', '');
				$rootScope.$broadcast('OnUpdateHeader', {'loggedIn':false});
				$location.path('/');
			}


			function init(){
	            $scope.token = $ms.getSessionItem('token');

	            $scope.bLoggedIn = $scope.token ? true : false;

	            $scope.menus = [{title:'XiangWang', show: true, click:home},
	            				{title:'Find', show: $scope.bLoggedIn, click:listing},
	            				{title:'Login', show: !$scope.bLoggedIn, click:login},
	            				{title:'Logout', show: $scope.bLoggedIn, click:logout},
	            				{title:'Sign Up', show: !$scope.bLoggedIn, click:signup}];

	            
			}
			
			init();
			
		} ])
