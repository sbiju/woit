
describe("Home Controller", function () {

    beforeEach(module("main"));

    describe("Test init home page", function () {

        var $controller, $ms, $location;

        beforeEach(inject(function($injector, _$location_) {
            $controller = $injector.get('$controller');
            $ms = $injector.get('MainService');
            $location = _$location_;
        }));

        it('should have an empty username inputbox', function () {
            var $scope = {};

            // init controller
            $controller('HomeCtrl', {
                 '$scope': $scope,
                 '$location':$location,
                 '$MainService': $ms
            });
            
            expect($scope.username.val).toBe('');
        });
    });

    
    describe("Login with admin", function () {

        var $controller, $httpBackend, $ms, $location;

        beforeEach(inject(function($injector, _$location_) {
            $controller = $injector.get('$controller');
            $httpBackend = $injector.get('$httpBackend');
            $ms = $injector.get('MainService');
            $location = _$location_;
            $httpBackend.when('GET', "api/users?username=Admin").respond([
                {id:'1', username:'Admin', password:'admin', email:'admin@gmail.com', role:1}]);
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should navigate to admin page', function (done) {
            var $scope = {};

            // init controller
            $controller('HomeCtrl', {
                 '$scope': $scope,
                 '$location':$location,
                 '$MainService': $ms
            });

            // set up input box
            $scope.username = {val: 'Admin'};
            $scope.login();

            setTimeout(function(){
                var user = $ms.getSessionItem('user');
                expect(user.username).toBe('Admin');
                expect($location.path()).toBe('/admin');
                done();
            }, 500);
            $httpBackend.flush();
        });
    });

    describe("Login with normal user", function () {

        var $controller, $httpBackend, $ms, $location;

        beforeEach(inject(function($injector, _$location_) {
            $controller = $injector.get('$controller');
            $httpBackend = $injector.get('$httpBackend');
            $ms = $injector.get('MainService');
            $location = _$location_;
            $httpBackend.when('GET', "api/users?username=Martin").respond([
                {id:'1', username:'Martin', password:'martin', email:'martin@gmail.com', role:0}]);
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should navigate to employee page', function (done) {
            var $scope = {};

            // init controller
            var homeCtrl = $controller('HomeCtrl', {
                 '$scope': $scope,
                 '$location':$location,
                 '$MainService': $ms
            });

            // set up input box
            $scope.username = {val: 'Martin'};
            $scope.login();

            setTimeout(function(){
                var user = $ms.getSessionItem('user');
                expect(user.username).toBe('Martin');
                expect($location.path()).toBe('/employee');
                done();
            }, 500);
            $httpBackend.flush();
        });
    });

});
