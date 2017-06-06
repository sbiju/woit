//--------------------------------------------------------------------------------------------------
//	Yocompute 2014-2017 Copyright reserved
//--------------------------------------------------------------------------------------------------
'use strict';

angular.module('main')

.controller('HomeController', [ '$scope', '$rootScope', '$http', '$location', 'MainService',
		  function( $scope, $rootScope, $http, $location, $ms) {
	
			//----------------------------------------------------------------------------------
			// Public methods
			//----------------------------------------------------------------------------------
			$scope.redirectTo = function(a){
				$location.path(a);
			}
			
			$scope.search = function(){
				$location.path('items');
			}


			var ownerTypes = ['Auther', 'Merchant', 'Orgnization'];
			var itemTypes = ['Original', 'In Market'];

			function initFilter(){
				$scope.ownerFilter = {
					data: ownerTypes,
					selected:{}
				}

				$scope.itemTypes = {
					data: itemTypes,
					selected:{}
				}
			}

			function init(){
				// $ms.checkToken(function(bValid){
				//  	$scope.bLoggedIn = bValid;

				//  	if(!bValid)
				//  		$location.path('signup');

				//  	$rootScope.$broadcast('OnUpdateHeader', {'loggedIn':bValid});
				// });
				
				$scope.keyWord = '';
				initFilter();
			}
			
			init();
			
		} ])
