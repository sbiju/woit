//--------------------------------------------------------------------------------------------------
//  Yocompute 2014-2017 Copyright reserved
//--------------------------------------------------------------------------------------------------
'use strict';

angular.module('main')

.directive('usernameValidChar', function () {
    return {
    	require:'ngModel',
    	link: function(scope, elm, attrs, ngModel){
    		ngModel.$validators.validChar = function(modelVal, viewVal){
    			var pattern = /[\/\\:\*\?\"<>\|]/g;
	        	return !pattern.test(modelVal);
    		}// end of function
    	}
    }
})

.directive('emailValidChar', function () {
    return {
    	require:'ngModel',
    	link: function(scope, elm, attrs, ngModel){
    		ngModel.$validators.validChar = function(modelVal, viewVal){
    			var pattern = /[\/\\:\*\?\"<>\|]/g;
	        	return !pattern.test(modelVal);
    		}// end of function
    	}
    }
})

.directive('email', function () {
    return {
    	require:'ngModel',
    	link: function(scope, elm, attrs, ngModel){
    		ngModel.$validators.email = function(modelVal, viewVal){
    			return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( modelVal );
    		}// end of function
    	}
    }
})

.directive('uniqueUsername',['$q', 'UserService', function ($q, $us) {
    return {
    	require:'ngModel',
    	link: function(scope, elm, attrs, ngModel){
    		ngModel.$asyncValidators.unique = function(modelVal, viewVal){
    			var def = $q.defer();
                $us.getUsers({'username':modelVal}).then(
                    function(d){
                        if(d){
                            def.reject();
                        }else{
                            def.resolve();
                        }
                    }
                )
                return def.promise;
    		}// end of function
    	}
    }
}])

.directive('uniqueEmail',['$q', 'UserService', function ($q, $us) {
    return {
    	require:'ngModel',
    	link: function(scope, elm, attrs, ngModel){
    		ngModel.$asyncValidators.unique = function(modelVal, viewVal){
    			var def = $q.defer();
                $us.getUsers({'email':modelVal}).then(
                    function(d){
                        if(d){
                            def.reject();
                        }else{
                            def.resolve();
                        }
                    }
                )
                return def.promise;
    		}// end of function
    	}
    }
}])

// fix me
.directive('accountExist',['$q', 'UserService', function ($q, $us) {
    return {
    	require:'ngModel',
    	link: function(scope, elm, attrs, ngModel){
    		ngModel.$asyncValidators.exist = function(modelVal, viewVal){
                var def = $q.defer();
                $us.getAccount({account:modelVal}).then(
                    function(d){
                        if(d){
                            def.reject();
                        }else{
                            def.resolve();
                        }
                    }
                )
                return def.promise;
    		}// end of function
    	}
    }
}])
