describe("main service", function() {
	var $ms;
	var $httpBack = null;
	var $http = null;

	beforeEach(function(){
		angular.mock.module("main");
		//angular.mock.module("pascalprecht.translate");
		
		angular.mock.inject(function(_MainService_,_$http_) {
			$ms= _MainService_;
			$http = _$http_;
		});
		
		angular.mock.inject(function($injector) {
		     $httpBack = $injector.get('$httpBackend');
		});
	});
	
	describe('test convert query string', function(){
		var $ms;

		beforeEach(function(){
			angular.mock.inject(function(_MainService_) {
				$ms= _MainService_;
			});
		});
		describe("null query", function() {
		    it("Should return empty string", function() {
		    	var ret = $ms.toQueryStr();
		    	expect(ret).toEqual('');
		    });
		});
		describe("empty string query", function() {
		    it("Should return empty string", function() {
		    	var ret = $ms.toQueryStr('');
		    	expect(ret).toEqual('');
		    });
		});
		describe("empty query", function() {
		    it("Should return empty string", function() {
		    	var ret = $ms.toQueryStr({});
		    	expect(ret).toEqual('');
		    });
		});
		describe("single query", function() {
		    it("Should return empty string", function() {
		    	var ret = $ms.toQueryStr({a:'b'});
		    	expect(ret).toEqual('?a=b');
		    });
		});
		describe("multiple query", function() {
		    it("Should return empty string", function() {
		    	var ret = $ms.toQueryStr({a:'a', b:'b', c:'c'});
		    	expect(ret).toEqual('?a=a&b=b&c=c');
		    });
		});
	});
	
	describe('test get session item', function(){
		it("should get null", function() {
			//$httpBack.whenGET(cfg.apiURL+'/cities?city=null&province=null&country=null').respond(
			//		{cities:[{id:0,city:'all',province:'all',country:'all'}]});
			$ms.setSessionItem('mytest')
		    var t = $ms.getSessionItem('mytest')
		    expect(t).toBe(null);

			t = $ms.getSessionItem()
		    expect(t).toBe(null);
			
			t = $ms.getSessionItem(null)
		    expect(t).toBe(null);
		    //$httpBack.flush();
		});
	})
	
	describe('test set session item', function(){
		it("should find all", function() {

		    $ms.setSessionItem('mytest')
			var t = $ms.getSessionItem('mytest');
		    expect(t).toBe(null);

			$ms.setSessionItem('mytest', null);
			t = $ms.getSessionItem('mytest')
		    expect(t).toBe(null);
			
			$ms.setSessionItem('mytest', undefined)
			t = $ms.getSessionItem('mytest')
		    expect(t).toBe(null);
			
			$ms.setSessionItem('mytest', '')
			t = $ms.getSessionItem('mytest')
		    expect(t).toBe('');
			
			$ms.setSessionItem('mytest', 0)
			t = $ms.getSessionItem('mytest')
		    expect(t).toBe(0);
		});
	})
	
	describe('test get local item', function(){
		it("should get null", function() {
			//$httpBack.whenGET(cfg.apiURL+'/cities?city=null&province=null&country=null').respond(
			//		{cities:[{id:0,city:'all',province:'all',country:'all'}]});
			$ms.setLocalItem('mytest')
		    var t = $ms.getLocalItem('mytest')
		    expect(t).toBe(null);

			t = $ms.getLocalItem()
		    expect(t).toBe(null);
			
			t = $ms.getLocalItem(null)
		    expect(t).toBe(null);
		    //$httpBack.flush();
		});
	})
	
	describe('test set local item', function(){
		it("should find all", function() {

		    $ms.setLocalItem('mytest')
			var t = $ms.getLocalItem('mytest');
		    expect(t).toBe(null);

			$ms.setLocalItem('mytest', null);
			t = $ms.getLocalItem('mytest')
		    expect(t).toBe(null);
			
			$ms.setLocalItem('mytest', undefined)
			t = $ms.getLocalItem('mytest')
		    expect(t).toBe(null);
			
			$ms.setLocalItem('mytest', '')
			t = $ms.getLocalItem('mytest')
		    expect(t).toBe('');
			
			$ms.setLocalItem('mytest', 0)
			t = $ms.getLocalItem('mytest')
		    expect(t).toBe(0);
		});
	})
});