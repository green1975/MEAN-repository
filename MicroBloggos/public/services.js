var myApp = angular.module('myApp');

myApp.factory('user', function(){
	var user= {
		username: String,
		email: String,
		password: String
	};
	return user;

});