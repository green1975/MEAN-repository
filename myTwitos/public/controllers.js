var myApp = angular.module('myApp', ['ui.router']);

myApp.controller('userController', ['$scope', '$http', '$state', function($scope, $http, $state){
	$scope.submit = function () {
		if ($scope.password == $scope.rptpass){
			var user =({ 
				firstname: $scope.firstname,
				lastname: $scope.lastname,
				codepostale: $scope.codepostale,
				email: $scope.email,
				password: $scope.password
			});

		}
		else
			$scope.verify = 'Les deux passwords sont différents';


		$http.post('/register', JSON.stringify(user))
		.then(
			function(response){
				$scope.reussite = response.data.message;
				$state.go('listuser');
			},

			function(response){
				$scope.erreur = response.data.message;

			};
		
	};

	$scope.username = '';
	$scope.email = '';
	$scope.password = '';


}]);

myApp.controller('loginController', ['$scope', '$http', '$state', '$rootScope', function($scope, $http, $state, $rootScope){
	$scope.email = 'tatat@yaho.fr';
	$scope.password = 'fred';
	$scope.submit = function () {
		

		var user =({ 
			email: $scope.email,
			password: $scope.password
		});		
		$http.post('/login', JSON.stringify(user))
		.then(
			function(response){
				var result = response.data;
				sessionStorage.token = response.data.token;
				sessionStorage.email = response.data.email;
				sessionStorage.name = response.data.name;
				
				$rootScope.session = sessionStorage.token;
				$rootScope.connect = sessionStorage.email;
				$state.go('chat');
			}, 
			function(error){
				$state.go('login');
				$scope.erreur = error.data;
				console.log(error.data);

			});
		$scope.email = '';
		$scope.password = '';
	}
}]);

myApp.controller('showController', ['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams){

	$scope.file = $stateParams.param1;


}]);
myApp.controller('logoutController', ['$state', '$rootScope', '$stateParams', function($state, $rootScope, $stateParams){
	$rootScope.session = null;
	$state.go('home', { stateParams: $rootScope.session});
}]);
myApp.controller('pageController', ['$scope', '$http', '$state', '$location', '$rootScope', function($scope, $http, $state, $location, $rootScope){

	var mail = $location.search().email;
	var nom = $rootScope.connect;
	
	$scope.submit = function () {

		
		var mess =({ 
			message: $scope.message,
			name: sessionStorage.name,
			email: $location.search().email,
		});
		$scope.post = mess;
		// var date = moment();
		// $scope.date = date;

		$http.post('/post', JSON.stringify(mess))
		.then(
			function(response){
				$scope.reussite = response.data.message;
			},

			function(response){
				$scope.erreur = response.data.message;

			});
		$scope.message = '';

		$http.get('page', { params: { mail: mail }})
		.then(
			function(user) {
				var params = user;
				$scope.contents = params.data.posts;
				$scope.bar = params.data;
			},
			function(response){
				$scope.erreur = 'ca ne marche pas';

			});

		
	};

	$http.get('page', { params: { mail: mail }})
	.then(
		function(user) {
			var params = user;
			$scope.contents = params.data.posts;
			$scope.bar = params.data;
		},
		function(response){
			$scope.erreur = 'ca ne marche pas';

		});

	$scope.addId = function(id) {
		$scope.id = id;
		var num = $scope.id;
		$http.get('/avis', { params: { id: num } })
		.then(function(billet) {
			var parametre = billet;
			$scope.comments = parametre.data.avis;
		});
	};

	$scope.sendnote = function(){
		var comment = {
			commentaire: $scope.note,
			name: sessionStorage.name,
			id: $scope.id

		};

		$http.post('/comment', JSON.stringify(comment))
		.then(
			function(result) {
				// $cope.reussite = "envoie reussie";
			},
			function(response){
				$scope.erreur = 'ca ne marche pas';
			});
		var num = $scope.id;
		$http.get('/avis', { params: { id: num } })
		.then(function(billet) {
			var parametre = billet;
		
			$scope.comments = parametre.data.avis;
		});
	};

	$scope.envoie = function(){

		var friends = {
			email: nom,
			friend: mail,
		};

		$http.post('/friend',JSON.stringify(friends))
		.then(
			function(response){
				$scope.reussite = response.data;
			},

			function(response){
				$scope.erreur = response.data;

			});
	};

	

}]);
myApp.controller('tchaterController', ['$scope', '$http', '$state', '$stateParams', '$filter', function($scope, $http, $state, $stateParams, $filter){
	$scope.name = sessionStorage.name;
	$scope.email = sessionStorage.email;
	var mail = $scope.email;

	$scope.submit = function () {
		
		var mess =({ 
			message: $scope.message,
			name: sessionStorage.name,
			email: sessionStorage.email
		});
		$scope.post = mess;
		// var date = moment();
		// $scope.date = date;

		$http.post('/post', JSON.stringify(mess))
		.then(
			function(response){
				$scope.reussite = response.data.message;
			},

			function(response){
				$scope.erreur = response.data.message;

			});
		$scope.message = '';
		$http.get('/chatshow/' + sessionStorage.email)
		.then(function(result) {
			var params = result;
			$scope.billets = params.data;
		},
		function(response){
			$scope.erreur = 'ca ne marche pas';
		});
	};


	$http.get('/chatshow/' + sessionStorage.email)
	.then(function(result) {
		var params = result;
		$scope.billets = params.data;
	},
	function(response){
		$scope.erreur = 'ca ne marche pas';
	});
	$scope.addId = function(id) {
		$scope.id = id;
		var num = $scope.id;
		$http.get('/avis', { params: { id: num } })
		.then(function(billet) {
			var parametre = billet;
			$scope.comments = parametre.data.avis;
		});
	};

	$scope.sendcomment = function(){
		var comment = {
			commentaire: $scope.commentaire,
			name: sessionStorage.name,
			id: $scope.id

		};

		$http.post('/comment', JSON.stringify(comment))
		.then(
			function(result) {
				$cope.reussite = "envoie reussie";
			},
			function(response){
				$scope.erreur = 'ca ne marche pas';
			});
		$scope.commentaire = '';
		var num = $scope.id;
		$http.get('/avis', { params: { id: num } })
		.then(function(billet) {
			var parametre = billet;
			$scope.comments = parametre.data.avis;
		});

	};

	$scope.increment = function(item){

		console.log(item.count += 1);
	};

	$scope.yes = function(){
		$http.get('/agree', { params: { mail: mail } })
		.then(function(user) {
			var parametre = user;
			$scope.ask = parametre.data.ask;
			
		});
	};

	$scope.no = function(){
		console.log('bye');
		$http.get('/disagree', { params: { mail: mail } })
		.then(function(user) {
			var parametre = user;
			$scope.ask = parametre.data.ask;

		});
	}; 

		
		$http.get('/list', { params: { mail: mail } })
		.then(function(user) {
			var parametre = user;
			$scope.ask = parametre.data.ask;
			$scope.friend = parametre.data.friend;
			console.log($scope.friend);
		});
	
	

}]);

myApp.controller('searchController', ['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams){
	

	$scope.submit = function(){
		var research = {
			search: $scope.research,
		};

		$http.post('/search', JSON.stringify(research))
		.then(
			function(result) {
				var params = result;
				$scope.file = params.data;
				$state.go('listuser', { param1: $scope.file });
			},
			function(response){
				$scope.erreur = 'ca ne marche pas';
			});
	}

}]);

