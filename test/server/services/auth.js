var assert = require("assert")
var Auth = require("../../../server/services/auth");
var DB = require("../../../server/db")
describe('Test auth service', function(){
	
	// Test decrypt()
	describe('When decrypt empty text', function(){
		it('should return empty', function(){
			var auth = new Auth();
			var d = auth.decrypt('');
			assert.equal(d, '');
			
			d = auth.decrypt();
			assert.equal(d, null);
			
			d = auth.decrypt(null);
			assert.equal(d, null);
		});
	});
	
	describe('When decrypt bad text', function(){
		it('should return null', function(){
			var auth = new Auth();
			var d = auth.decrypt('abc');
			assert.equal(d, null);
		});
	});
	
	describe('Test encrypt and decrypt', function(){
		it('should return null', function(){
			var auth = new Auth();
			var d = auth.encrypt('mypassword');
			var t = auth.decrypt(d);
			
			assert.equal(t, 'mypassword');
		});
	});
	
	describe('Test sign and verify token', function(){
		it('should return null', function(done){
			var auth = new Auth();
			auth.signToken('mypassword', function(token){
				auth.verifyToken(token, function(err, t){
					assert.equal(t, 'mypassword');
					done();
				});
			});
		});
	});
	
	describe('Test sign and verify empty token', function(){
		it('should return undefined', function(done){
			var auth = new Auth();
			auth.verifyToken(null, function(err, t){
				assert.equal(t, undefined);
				done();
			});
		});

		it('should return undefined', function(done){
			var auth = new Auth();
			auth.verifyToken('', function(err, t){
				assert.equal(t, undefined);
				done();
			});
		});
	});


	describe('Test userExists', function(){
		it('should return codes', function(done){
			var auth = new Auth();
			
			var user = {'username': 'guest', 'password':'mypassword', 'email': 'guest@angularz.com'};
			var errors = [];
			auth.saveUser(user, errors, function(errs, token){
				
				var query = {username:'guest', email:'guest@angularz.com'};
				auth.userExists(query, function(errors){
					assert.equal(errors.length, 2);
					
					assert.notEqual(errors.indexOf(8), -1);//Error.USERNAME_EXISTS
					assert.notEqual(errors.indexOf(6), -1);//Error.EMAIL_EXISTS
					
					var db = DB();
					db.remove('users', {'username':'guest'}, function(err, d){
						done();
					});
				});
			});
		});
	});
	
	describe('Test save user and return token', function(){
		it('should return null', function(done){
			var auth = new Auth();
			var user = {'username': 'guest', 'password':'mypassword', 'email': 'guest@angularz.com'};
			var errors = [];
			auth.saveUser(user, errors, function(errs, token){
				auth.verifyToken(token, function(err, t){
					assert.equal(t.username, 'guest');
					assert.equal(t.email, 'guest@angularz.com');
					var db = DB();
					db.findOne('users', {'username':'guest'}, function(err, doc){
						assert.equal(doc.username, 'guest');
						assert.notEqual(doc.password, 'mypassword');
						
						db.remove('users', {'username':'guest'}, function(err, d){
							assert.equal(err, null);
							assert.equal(d.result.ok, 1);
							assert.equal(d.result.n, 1);
							
							done();
						});
					});
				});
			});
		});
	});//end of describe
	
	describe('Test update user and return token', function(){
		it('should return null', function(done){
			var auth = new Auth();
			var user = {'username': 'guest', 'password':'mypassword', 'email': 'guest@angularz.com'};
			var errors = [];
			auth.saveUser(user, errors, function(errs, token){
				var db = DB();
				db.findOne('users', {'username':'guest'}, function(err, doc){
					user = doc;
					user.username = 'guest1';
					
					auth.saveUser(user, errors, function(errs2, token2){
						
						db.findOne('users', {'username':'guest'}, function(err3, doc3){
							assert.equal(doc3, null);
							
							db.findOne('users', {'username':'guest1'}, function(err3, doc3){
								assert.notEqual(doc3, null);
								db.remove('users', {'username':'guest1'}, function(err, d){
									assert.equal(err, null);
									assert.equal(d.result.ok, 1);
									assert.equal(d.result.n, 1);
									
									done();
								});
							});
						});
					});
					

				});
			});
		});
	});//end of describe
	
	describe('Test validate signup', function(){
		it('should have no error', function(done){
			var auth = new Auth();
			auth.validateSignup({ email: 'my@angularZ.com', username:'martin', password:'decrypted' }, function(errors){
					assert.equal(errors.length, 0);
					done();
			});
		});
	});//end of describe
	
	describe('Test validate signup', function(){
		it('should have errors', function(done){
			var auth = new Auth();
			auth.validateSignup({ email: 'my@angularZ', username:'', password:'' }, function(errors){
				assert.equal(errors.length, 2);
				assert.notEqual(errors.indexOf(7), -1);//Error.USERNAME_EMPTY
				assert.notEqual(errors.indexOf(9), -1);//Error.PASSWORD_EMPTY
				//assert.notEqual(errors.indexOf(5), -1);//Error.INVALID_EMAIL
				done();
			});
		});
		it('should have errors', function(done){
			var auth = new Auth();
			auth.validateSignup({ email: 'my@angularZ', username:null, password:null }, function(errors){
				assert.equal(errors.length, 2);
				assert.notEqual(errors.indexOf(7), -1);//Error.USERNAME_EMPTY
				assert.notEqual(errors.indexOf(9), -1);//Error.PASSWORD_EMPTY
				//assert.notEqual(errors.indexOf(5), -1);//Error.INVALID_EMAIL
				done();
			});
		});
		it('should have errors', function(done){
			var auth = new Auth();
			
			var user = {'username': 'guest', 'password':'mypassword', 'email': 'guest@angularz.com'};
			var errors = [];
			auth.saveUser(user, errors, function(errs, token){
				auth.validateSignup({ email: '', username:'guest', password:'de' }, function(errors){
					assert.equal(errors.length, 3);
					assert.notEqual(errors.indexOf(4), -1);//Error.EMAIL_EMPTY
					assert.notEqual(errors.indexOf(10), -1);//Error.PASSWORD_TOO_SIMPLE
					assert.notEqual(errors.indexOf(8), -1);//Error.USERNAME_EXISTS
					
					var db = DB();
					db.remove('users', {'username':'guest'}, function(err, d){
						done();
					});
				});
			});
		});
	});//end of describe
	
	describe('Test validate login account', function(){
		it('should have errors', function(done){
			var auth = new Auth();
			auth.validateLoginAccount({ account: 'my@angularZ',  password:'' }, function(errors, doc){
				assert.equal(errors.length, 1);
				assert.notEqual(errors.indexOf(1), -1);//Error.ACCOUNT_NOT_EXIST
				done();
			});
		});
		
		it('should have errors', function(done){
			var auth = new Auth();
			auth.validateLoginAccount({ account:'zlk', password:'' }, function(errors, doc){
				assert.equal(errors.length, 0);
				done();
			});
		});
		
		it('should have errors', function(done){
			var auth = new Auth();
			auth.validateLoginAccount({ account:'', password:'' }, function(errors, doc){
				assert.equal(errors.length, 1);
				assert.notEqual(errors.indexOf(3), -1);//Error.ACCOUNT_EMPTY
				done();
			});
		});
		
		it('should have errors', function(done){
			var auth = new Auth();
			
			var user = {'username': 'guest', 'password':'mypassword', 'email': 'guest@angularz.com'};
			var errors = [];
			auth.saveUser(user, errors, function(errs, token){
				auth.validateLoginAccount({ account:'guest', password:'de' }, function(errors, doc){
					assert.equal(errors.length, 0);
					
					var db = DB();
					db.remove('users', {'username':'guest'}, function(err, d){
						done();
					});
				});
			});
		});
	});//end of describe
	
	describe('Test validate login password', function(){

		it('should have errors', function(done){
			var auth = new Auth();
			
			var user = {'username': 'guest', 'password':'mypassword', 'email': 'guest@angularz.com'};
			var errors = [];
			auth.saveUser(user, errors, function(errs, token){
				var db = DB();
				db.findOne('users', {'username':'guest'}, function(err, doc){
					auth.validateLoginPassword({ username:'guest', password:'de' }, doc.password, function(errors){
						assert.equal(errors.length, 1);
						assert.notEqual(errors.indexOf(2), -1);//Error.PASSWORD_MISMATCH
						
						var db = DB();
						db.remove('users', {'username':'guest'}, function(err, d){
							done();
						});
					});
				});

			});
		});
	});//end of describe
});