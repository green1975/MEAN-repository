var myApp = angular.module('myApp', ['ngRoute']);

myApp.controller('userController', ['$scope', '$http', '$location', function($scope, $http, $location){
	
	$scope.submit = function () {
		if ($scope.password == $scope.rptpass){
			var user =({ 
				username: $scope.username,
				email: $scope.email,
				password: $scope.password
			});}
			else
				$scope.verify = 'Les deux passwords sont différents';
			console.log(user);


			$http.post('/register', JSON.stringify(user))
			.then(
				function(response){
					$location.url('/listuser');
					$scope.reussite = response.data.message;
				},
					
				function(response){
					$scope.erreur = response.data.message;
					
				});
			$scope.username = '';
			$scope.email = '';
			$scope.password = '';
		}


	}]);

myApp.controller('loginController', ['$scope', '$http', '$location', 'user', function($scope, $http, $location, user){

	$scope.submit = function () {

		var user =({ 
			email: $scope.email,
			password: $scope.password
		});		
		
		$http.post('/login', JSON.stringify(user))
		.then(
			function(response){
				sessionStorage.user = JSON.stringify(user.email);
				$location.url('/listuser');
				$scope.reussite = 'You are logged !';
			}, 
			function(response){
				$scope.erreur = 'erreur';	
			});
		$scope.email = '';
		$scope.password = '';
	}




}]);

myApp.controller('showController', ['$scope', '$http', function($scope, $http){

	 $http.get('/show')
    .then(
    	function(result) {
    		var params = result;
        	$scope.list = params.data;
    	},
    	function(response){
    		$scope.erreur = 'ca ne marche pas';
    	});

}]);
myApp.controller('logoutController', ['$location', function($location){
	Session.clear();
	$location.url('/');
}]);
myApp.controller('postController', ['$scope', '$http', '$location', function($scope, $http, $location){
	
	$scope.submit = function () {
		
			var mess =({ 
				message: $scope.message,
				name: sessionStorage
				});
			

			$http.post('/sauvegarde', JSON.stringify(mess))
			.then(
				function(response){
					$location.url('/listuser');
					$scope.reussite = response.data.message;
				},
					
				function(response){
					$scope.erreur = response.data.message;
					
				});
			$scope.message = '';
			
		}


	}]);
