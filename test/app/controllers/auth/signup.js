
describe("Signup Controller", function () {

    beforeEach(module("main"));

    describe("Test login page initialization", function () {

        var $controller, $as, $ms, $location;

        beforeEach(inject(function($injector, _$location_) {
            $controller = $injector.get('$controller');
            $as = $injector.get('AuthService');
            $ms = $injector.get('MainService');
            $location = _$location_;
        }));

        it('should have empty inputbox', function () {
            var $scope = {};

            // init controller
            $controller('SignupController', {
                 '$scope': $scope,
                 '$location':$location,
                 '$AuthService': $as,
                 '$MainService': $ms
            });
            
            expect($scope.username).toBe('');
            expect($scope.email).toBe('');
            expect($scope.password).toBe('');
        });
    });

    
    describe("Signup successful", function () {

        var $controller, $httpBackend, $as, $ms, $location;

        beforeEach(inject(function($injector, _$location_) {
            $controller = $injector.get('$controller');
            $httpBackend = $injector.get('$httpBackend');
            $as = $injector.get('AuthService');
            $ms = $injector.get('MainService');
            $location = _$location_;

            $httpBackend.when('POST', cfg.API_URL + 'login', {'account':'a', 'password':'b'}).respond({
                'token':'test',
                'users': '[{"model": "auth.user", "pk": 1, "fields": {"password": "", "last_login": "2017-06-08T04:47:12.997Z", "is_superuser": true, "username": "admin", "first_name": "", "last_name": "", "email": "mardingca@gmail.com", "is_staff": true, "is_active": true, "date_joined": "2017-06-06T11:35:18.435Z", "groups": [], "user_permissions": []}}]'
            });
        }));

        afterEach(function() {
            //$httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should navigate page', function (done) {
            var $scope = {};

            $controller('SignupController', {
                 '$scope': $scope,
                 '$location':$location,
                 '$AuthService': $as,
                 '$MainService': $ms
            });

            $scope.username = 'a';
            $scope.email = 'c';
            $scope.password = 'b';
            $scope.submit();
            $httpBackend.flush();

            setTimeout(function(){
                var user = $ms.getSessionItem('user');
                expect(user.fields.username).toBe('admin');
                //expect($location.path()).toBe('/admin');
                done();
            }, 500);
            //$httpBackend.flush();
        });
    });

    describe("Signup with user successful", function () {

        var $controller, $httpBackend, $as, $ms, $location;

        beforeEach(inject(function($injector, _$location_) {
            $controller = $injector.get('$controller');
            $httpBackend = $injector.get('$httpBackend');
            $as = $injector.get('AuthService');
            $ms = $injector.get('MainService');
            $location = _$location_;
            $httpBackend.when('POST', cfg.API_URL + 'login', {'account':'admin@gmail.com', 'password':'b'}).respond({
                'token':'test',
                'users': '[{"model": "auth.user", "pk": 1, "fields": {"password": "", "last_login": "2017-06-08T04:47:12.997Z", "is_superuser": true, "username": "admin", "first_name": "", "last_name": "", "email": "mardingca@gmail.com", "is_staff": true, "is_active": true, "date_joined": "2017-06-06T11:35:18.435Z", "groups": [], "user_permissions": []}}]'
            });
        }));

        afterEach(function() {
            //$httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should navigate to page', function (done) {
            var $scope = {};

            // init controller
            $controller('SignupController', {
                 '$scope': $scope,
                 '$location':$location,
                 '$AuthService': $as,
                 '$MainService': $ms
            });

            $scope.username = 'a';
            $scope.email = 'c';
            $scope.password = 'b';
            $scope.submit();
            $httpBackend.flush();

            setTimeout(function(){
                var user = $ms.getSessionItem('user');
                expect(user.fields.username).toBe('admin');
                done();
            }, 500);
            
        });
    });

});
