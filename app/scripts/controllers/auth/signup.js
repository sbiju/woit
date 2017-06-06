//--------------------------------------------------------------------------------------------------
//	Yocompute 2014-2017 Copyright reserved
//--------------------------------------------------------------------------------------------------

'use strict';

//var eSignUpError = {
//		NONE:0,
//		USERNAME_EXISTS:1,
//		EMAIL_EXISTS:2,
//		USERNAME_EMPTY:3,
//		PASSWORD_EMPTY:4,
//		EMAIL_EMPTY:5,
//		PASSWORD_TOO_SHORT:6,
//		PASSWORD_TOO_SIMPLE:7,
//		INVALID_EMAIL:8,
//		SAVE_FAILED:9
//}



angular.module('main')

.controller('SignUpController', [ '$scope', '$rootScope','$http', '$location', 'MainService', 'AuthService',
                      				function( $scope, $rootScope, $http, $location, $ms, $auth) {

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

	
	//------------------------------------------------------------------------
	// Initialize
	//------------------------------------------------------------------------
	

	//$scope.error = {username:"", password:"", email:"", agreement:""};
	//$ms.resize();
	
	function init(){
		$scope.signup = {username:"", password:"", email:"", role:''};

		for( var key in $scope.error){
			$scope.$watch("error." + key, function(newVal, oldVal){
				if(newVal){
					$scope.error[key] = "";
				}
			});
		}

		//$scope.signupForm = { username:{$error:{required:true, minLength:true, maxLength:true}}};

		$scope.username = { err: "", val:"" };
		$scope.email 	= { err: "", type: "email", val:"" };
		$scope.password = { err: "", type: "password", val:"" };
		$scope.agreeTerm = { checked: false };
	}
	


	//-------------------------------------
	// Public methods
	//-------------------------------------
	$scope.openTermsPage = function(){
		$location.path('legal-terms');
	}
	
	$scope.openPrivacyPage = function(){
		$location.path('privacy-policy');
	}
	
	$scope.showError = function(field){
		return field.$invalid;
	}

	$scope.invalidChar = function(value){
		var pattern = /[\/\\:\*\?\"<>\|]/g;
	    return pattern.test(value);
	}

	$scope.onChangeUsername = function(val){
		$scope.username.err = '';
	}

	$scope.signUp = function() {
		/*
		cleanErrorMessage();
		
		if(!$scope.agreeTerm){
			$scope.error.agreement = "*In order to use our services, you must agree our Terms and privacy policy.";
		}else{
			$scope.error.agreement = "";
		}
		*/
		// if(!$scope.username.val){
		// 	$scope.username.err = 'Empty';
		// }else if($auth.hasInvalidChar($scope.username.val)){
		// 	$scope.username.err = 'InvalidChar';
		// }else if($auth.accountExistSync({account: $scope.username.val})){
		// 	$scope.username.err = 'Exist';
		// }

		// if(!$scope.email.val){
		// 	$scope.email.err = 'Empty';
		// }else if(!$auth.isEmail($scope.email.val)){
		// 	$scope.email.err = 'Invalid';
		// }else if($auth.emailExistSync({email: $scope.email.val})){
		// 	$scope.email.err = 'Exist';
		// }

		// if(!$scope.password.val){
		// 	$scope.password.err = 'Empty';
		// }


		// if($scope.username.err || $scope.email.err|| $scope.password.err){
		// 	// setTimeout(function(){
		// 	// 	$scope.$apply();
		// 	// },0);
		// 	return;
		// }

		
		var user = new User('', $scope.username.val, $scope.email.val, $scope.password.val);

		$auth.signup(user).then(function(d){
			if(d.data.token){
				alert('signup success!');
				$rootScope.$broadcast("OnUpdateHeader",{'loggedIn':true});
				$ms.setSessionItem('token', d.data.token);
				$location.path('items');
			}
		})
	}
			
	//----------------------------------
	// Private methods
	//----------------------------------
  	function loginSuccessHdlr(data){
		$ms.setSessionItem('token', data.token);
		$ms.setSessionItem('user', data.decoded);
		$rootScope.$broadcast("OnUpdateHeader");
		
		if(data.decoded.username == 'admin'){
			$location.path('/admin');
		}else{
			$location.path('/');
		}
  	}
  	
	function cleanErrorMessage(){
		for( var key in $scope.error){
			$scope.error[key] = "";
		}
	}
			
	function setErrorMessage(errors){
		// if(errors.indexOf(Error.USERNAME_EXISTS) != -1){
		// 	$scope.signupForm.username.$error.exist = true;
		// }else{
		// 	$scope.signupForm.username.$error.exist = false;
		// }

		// if(errors.indexOf(Error.PASSWORD_TOO_SIMPLE) != -1){
		// 	$scope.signupForm.$error.simplePassword = true;//"*At least 6 characters, include uppercase, lowercase and numbers";
		// }else{
		// 	$scope.signupForm.$error.simplePassword = false;
		// }

		// if(errors.indexOf(Error.INVALID_EMAIL) != -1){
		// 	$scope.signupForm.email.$error.invalid = true;
		// 	$scope.signupForm.email.$valid = false;
		// 	$scope.signupForm.email.$invalid = true;
		// }else{
		// 	$scope.signupForm.email.$error.invalid = false;
		// 	$scope.signupForm.email.$invalid = false;
		// 	$scope.signupForm.email.$valid = true;
		// 	if(errors.indexOf(Error.EMAIL_EXISTS) != -1){
		// 		$scope.signupForm.email.$error.exist = true;
		// 		$scope.signupForm.email.$valid = false;
		// 		$scope.signupForm.email.$invalid = true;
		// 	}else{
		// 		$scope.signupForm.email.$error.exist = false;
		// 		$scope.signupForm.email.$invalid = false;
		// 		$scope.signupForm.email.$valid = true;
		// 	}
		// }
	}
	
	//----------------------------------
	// Events
	//----------------------------------
	init();
}])
