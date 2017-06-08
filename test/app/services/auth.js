//--------------------------------------------------------------------------------------------------
//	Yocompute 2014-2017 Copyright reserved
//--------------------------------------------------------------------------------------------------

describe("Test auth service", function() {
	beforeEach(module("main"));

	describe('when encrypt empty text', function(){
		var $auth;
		beforeEach(function(){
			angular.mock.inject(function($injector) {
				$auth = $injector.get('AuthService');
			});
		});
		it("should return empty", function() {
		    var encrypted = $auth.encrypt('');
				expect(encrypted).not.toBe(null);
		});
	})
	
	describe('when encrypt empty ', function(){
		var $auth;
		beforeEach(function(){
			angular.mock.inject(function($injector) {
				$auth = $injector.get('AuthService');
			});
		});
		it("should return empty", function() {
		    var encrypted = $auth.encrypt();
				expect(encrypted).toBe(null);
		});
	})

	describe('when login', function(){
		var $httpBackend = null;
		var $auth;

		beforeEach(function(){
			angular.mock.inject(function($injector) {
				$auth = $injector.get('AuthService');
				$httpBackend = $injector.get('$httpBackend');
				$httpBackend.when('POST', cfg.API_URL + 'login', {'account':'a', 'password':'b'}).respond({'token':'test'});
			});
		});

		afterEach(function() {
	        $httpBackend.verifyNoOutstandingExpectation();
	        $httpBackend.verifyNoOutstandingRequest();
	    });


		it("should return token", function() {
		    $auth.login('a', 'b').then(function(d){
		    	expect(d.data.token).toBe('test');
		    });
		    $httpBackend.flush();
		});
	})

	describe('when signup', function(){
		var $httpBackend = null;
		var $auth;

		beforeEach(function(){
			angular.mock.inject(function($injector) {
				$auth = $injector.get('AuthService');
				$httpBackend = $injector.get('$httpBackend');
				$httpBackend.when('POST', cfg.API_URL + 'signup', {'account':'a', 'password':'b'}).respond({'token':'test'});
			});
		});

		afterEach(function() {
	        $httpBackend.verifyNoOutstandingExpectation();
	        $httpBackend.verifyNoOutstandingRequest();
	    });


		it("should return token", function() {
		    $auth.signup({'account':'a', 'password':'b'}).then(function(d){
		    	expect(d.data.token).toBe('test');
		    });
		    $httpBackend.flush();
		});
	})
});