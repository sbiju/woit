//--------------------------------------------------------------------------------------------------
//	Yocompute 2014-2017 Copyright reserved
//--------------------------------------------------------------------------------------------------
'use strict';

angular.module('main')

.controller('ItemDetailController', [ '$scope', '$routeParams', '$location', 'UserService', 'ItemService', 'MainService',
		  function( $scope,  $rooteParams, $location, $us, $is, $ms) {

		  	$scope.offer = function(){
		  		$is.offer($scope.buyer, $scope.item, $scope.price).then(function(){

		  		})
		  	}

			$scope.init = function(){
				$scope.buyer = $ms.getSessionItem('user');

				var id = $rooteParams.id.substring(1);
				var item;
				$is.getItems({'id': id}).then(function(items){
					var data = JSON.parse(items.data);
					if(data && data.length > 0){
						item = data[0];
					}else{
						//$scope.item = null;
					}

					$us.getUsers({'id': item.fields.owner}).then(function(d){
						var users = JSON.parse(d.data);
						item.fields['owner_username'] = users[0].fields.username;
						$scope.item = item;
					})
				})
			}
			
			$scope.init();
			
		} ])