var myServices = angular.module('myServices', []);

myServices.run (['$rootScope', function($rootScope){
	$rootScope.session = null;
}]);

myServices.factory('logger', function($rootScope){

	var logger = {};

	logger.set = function(msg){
		$rootScope.session = msg.token;
		$rootScope.email = msg.email;
		$rootScope.val = msg.val;
	};
	logger.out = function(){
		$rootScope.session = null;
		$rootScope.email = null;
		$rootScope.val = null;
	};

	return logger;
})