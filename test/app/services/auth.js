describe("Test auth service", function() {
	var RESTFUL_URL = 'api';
	var auth;
	var $httpBack = null;
	var $http = null;

	// angular.mock.inject wraps a function into an injectable function, instance of $injector
	beforeEach(function(){
		angular.mock.module("auth");
		angular.mock.module("ngResource");
		
		angular.mock.inject(function(_AuthService_,_$http_) {
			auth = _AuthService_;
			$http = _$http_;
		});
		
		angular.mock.inject(function($injector) {
		     // Set up the mock http service responses
		     $httpBack = $injector.get('$httpBackend');
		});
	});
	
	describe('when encrypt empty text', function(){
		it("should return empty", function() {
		    var encrypted = auth.encrypt('');
				expect(encrypted).toBe(null);
		});
	})
	
//	describe('test findCities', function(){
//		it("should find all", function() {
//			$httpBack.whenGET(RESTFUL_URL+'/cities?city=null&province=null&country=null').respond(
//					{cities:[{id:0,city:'all',province:'all',country:'all'}]});
//
//		    auth.findCities({city:null,province:null,country:null}, function(_cities){
//				expect(_cities.length).toBe(1);
//				expect(_cities[0].city).toBe('all');
//			});
//			
//		    $httpBack.flush();
//		});
//	})
});