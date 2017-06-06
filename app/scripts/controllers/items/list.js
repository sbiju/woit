//--------------------------------------------------------------------------------------------------
//	Yocompute 2014-2017 Copyright reserved
//--------------------------------------------------------------------------------------------------
'use strict';

angular.module('main')

.controller('ItemListController', [ '$scope', '$rootScope', '$http', '$location', 'MainService', 'ItemService',
	function( $scope, $rootScope, $http, $location, $ms, $is) {
	
		//----------------------------------------------------------------------------------
		// Public methods
		//----------------------------------------------------------------------------------
		$scope.redirectTo = function(a){
			$location.path(a);
		}

		$scope.select = function(item){
			$location.path('items/:' + item.pk);
		}

		$scope.getMainPhoto = function(r){
			if(r.photos){
				return r.photos.length > 0 ? r.photos[0]:'images/portrait.png';
			}else{
				return 'images/portrait.png';					
			}
		}

		// deprecated
		$scope.getProfile = function(r){
			if(r && r.profile){
				return r.profile[0];
			}else{
				return null;
			}
		}

		$scope.search = function(){
			$is.getItems().then(function(items){
				$scope.itemList.data = JSON.parse(items.data);
			});
		}

		$scope.selectOwner = function(item){
			var filter = {
				owner:''
			}

		};

		function initFilter(filter){

		}

		function init(){
			//var filter = $ms.getSessionItem('filter');

			$scope.itemList = {
				opt:{
					textField: 'fields.title',
					valueField: 'pk',
					limit:512
				},
				data:[]
			}

			$scope.search();
		}
			


		init();
			
} ])