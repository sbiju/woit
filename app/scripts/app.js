//--------------------------------------------------------------------------------------------------
//  Yocompute 2014-2017 Copyright reserved
//--------------------------------------------------------------------------------------------------

'use strict';

angular.module('myApp', ['ngResource', 'ngRoute', 'ngCookies', 'ngSanitize', 'ngTouch', 'ngAnimate', 'ngMaterial', 'ngMessages',
                                 'pascalprecht.translate',
                                 'main'
                           ])
//-------------------------------------------------------------------------------
// Get executed during the provider registrations and configuration phase. 
// Only providers and constants can be injected into configuration blocks.
//-------------------------------------------------------------------------------
.config(['$routeProvider', '$translateProvider' ,  
	function($routeProvider, $translateProvider){

    $routeProvider
		.when('/', {
		  	templateUrl: '/views/home.html'
		}).when('/items',{
				templateUrl:'/views/items/list.html'
		}).when('/items/:id', {
				templateUrl: '/views/items/detail.html'
		}).when('/login',{
		 	templateUrl: '/views/auth/login.html'
		}).when('/signup',{
			templateUrl: '/views/auth/signup.html'
		}).when('/profile', {
				templateUrl: '/views/profile.html'
		}).when('/message',{
			templateUrl: '/views/message.html'	
		}).otherwise({
		  	redirectTo: '/login'
		});
    // Translation
    //$translateProvider.translations('en_US', en_US );  
    //$translateProvider.translations('zh_CN', zh_CN );
    
    //$translateProvider.preferredLanguage('en_US');
}]);

