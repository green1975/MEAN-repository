var myApp = angular.module('myApp', ['ui.router', 'myServices', 'angularjs-datetime-picker', 'ngFileUpload']);

myApp.controller('registercontroller', function($scope, $http, $state){

	$scope.submit = function(){
		if ($scope.password == $scope.rptpassword){

			var user = {
				username: $scope.username,
				email: $scope.email,
				password: $scope.password,
			};

		}
		else{
			$scope.pass ='password are differents !!!';
		};

		$http.post('/register', JSON.stringify(user))
		.then(
			function(response){
				$scope.message = response.data.message,
				$state.go('user') 
			},
			function(response){
				$scope.erreur = 'there is a problem!!!'
			});

		
	};

	$scope.username = '';
	$scope.email = '';
	$scope.password = '';

}),

myApp.controller('logincontroller', function($scope, $http, $state, logger){
	
	$scope.send = function(){
		var user = {
			email: $scope.email,
			password: $scope.password,
		};
		
		$http.post('/login', JSON.stringify(user))
		.then(
			function(response){
				if (response.data.success == true && response.data.val == false){
					$scope.message = response.data.message,
					toto = response.data;
					$state.go('user');
					logger.set(toto);
				}
				else if (response.data.success == true && response.data.val == true){
					$scope.message = response.data.message,
					toto = response.data;
					$state.go('admin');
					logger.set(toto);
				}
				else{
					$scope.bad = response.data.success;
					$scope.erreur = response.data.message;

				};
			});
	};

	$scope.email = '';
	$scope.password= '';
}),

myApp.controller('logoutcontroller', function($scope, $http, $rootScope, logger){
	logger.out();
}),

myApp.controller('usercontroller', function($scope, $http, $rootScope,$state, logger, Upload, $timeout){

	$scope.send = function(){
		var product = {
			email: $rootScope.email,
			name: $scope.name,
			description: $scope.description,
			category: $state.val1,
			subcategory: $state.val,
			enddate: $scope.date3,
			price: $scope.price,
		};
		console.log(product);
		$http.post('/creation', JSON.stringify(product))
		.then(
			function(response){
				$state.go('user');
			});
		$http.get('/show', {params: {email: $rootScope.email}})
		.then(
			function(array){
				$scope.table = array.data;
			});
		$scope.name = '';
		$scope.description = '';
		$scope.price = '';
	};

	$scope.uploadPic = function(file) {
		file.upload = Upload.upload({
			url: 'ftp://didierpot2000@wanadoo.fr@perso-ftp.orange.fr/uploads',
			fields: {username: $scope.username},
			files: file,
		});
		file.upload.then(function (response) {
			$timeout(function () {
				file.result = response.data;
				console.log(response.data);
			});
		}, function (response) {
			if (response.status > 0)
				$scope.errorMsg = response.status + ': ' + response.data;
		}, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
  });
	}
	$http.get('/show', {params: {email: $rootScope.email}})
	.then(
		function(array){
			$scope.table = array.data;
		});

	$http.get('/showprod', {params: {email: $rootScope.email}})
	.then(
		function(response){
			var countDownDate = new Date().getTime();
			var now = new Date().getTime();
			var distance = countDownDate - now;
			$scope.end = distance;
		});
}),

myApp.controller('auctioncontroller', function($scope, $http, $rootScope,$state, logger){
	
	$scope.submit = function(){

		var auction = {
			email: $rootScope.email,
			price: $scope.price,
			product: $state.auction,
		};

		$http.post('/newauction', JSON.stringify(auction))
		.then(
			function(response){
				if(response.data.success == true){
					$scope.ok = response.data.success;
					$scope.message = response.data.message;
				}
				else{
					$scope.bad = response.data.success;
					$scope.error = response.data.message;
				};
			});

		$http.get('/listauction', {params: { product: $state.auction }})
		.then(
			function(result){
				$scope.list = result.data;

			});

	};

	$http.get('/listauction', {params: { product: $state.auction }})
	.then(
		function(result){
			$scope.list = result.data;
		});
	$http.get('/myauction', {params: { email: $rootScope.email }})
		.then(
			function(result){
				$scope.val = result.data;

			});
}),

myApp.controller('productcontroller', function($scope, $http, $rootScope,$state, logger){

	
	$http.get('/showprod')
	.then(
		function(response){

			var data =[];
			for (i=0; i< response.data.length; i++)
			{
				var value = response.data[i];
				var countDownDate = new Date(value.enddate).getTime();
				var now = new Date().getTime();
				var distance = countDownDate - now;
				var days = Math.floor(distance / (1000 * 60 * 60 * 24));
				var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((distance % (1000 * 60)) / 1000);
				$scope.end = days + "d " + hours + "h ";
				for(x=0;x < value.auctions.length;x++){
					var val = value.auctions[x];
				};
				var object = {
					id: value._id,
					name: value.name,
					description: value.description,
					auction: val.prix,
					price: value.price,
					end: $scope.end,
					email: val.mail,
				};
				data.push(object);
			};
			$scope.cards = data;
		});
	$scope.auction = function(auc){
		$state.auction = auc;
	};
}),

myApp.controller('admincontroller', function($scope, $http, $rootScope,$state, logger){

	$http.get('/showprod')
	.then(
		function(result){
			$scope.prods = result.data;
		});
	$http.get('/showuser')
	.then(
		function(user){
			$scope.list = user.data;

		});

	$scope.erase = function(id){
		$scope.val = id;	
		
		$http.get('/deleteproduct', {params: {id: $scope.val}})
		.then(
			function(response){

			});
		$http.get('/showprod')
		.then(
			function(result){
				$scope.prods = result.data;
			});
	};

	$scope.supp = function(mail){
		$scope.email = mail;

		$http.get('/deleteuser', {params: {email: $scope.email}})
		.then(
			function(response){
				
			});
	};

	$scope.edit = function(aff){
		$scope.aff = aff;
		$http.get('/editproduct', {params: {edit: $scope.aff}})
		.then(
			function(response){
				$scope.prod = response.data;
			});
	};

	$scope.fich = function(ed){
		$scope.ed = ed;
		$http.get('/fichuser', {params: {fich: $scope.ed}})
		.then(
			function(response){
				$scope.res = response.data;
			});
	};

	$scope.change = function(val){
		$scope.val = val;
		var mod = ({
			id: $scope.val,
			name: $scope.nom,
			description: $scope.desc,
			price: $scope.prix,
		});
		$http.post('/modifyproduct', JSON.stringify(mod))
		.then(
			function(response){
			});
		$http.get('/showprod')
		.then(
			function(result){
				$scope.prods = result.data;
			});
	};

	$scope.mod = function(mail){

		var modi = ({
			email: mail,
			name: $scope.user,
		});

		$http.post('/modifyuser', JSON.stringify(modi))
		.then(
			function(response){

			});
		$http.get('/showuser')
		.then(
			function(user){
				$scope.list = user.data;

			});
	};

	$scope.add = function(){
		var cat = ({
			name: $scope.cate,
		});

		$http.post('/newcategory', JSON.stringify(cat))
		.then(
			function(response){

			});
	};

	$scope.choice = function(val){
		var choix = val;
		$scope.name = choix;
	};

	$scope.subcat = function(){

		var sub = ({
			cat: $scope.name,
			subcat: $scope.sub,
		});

		$http.post('/subcat', JSON.stringify(sub))
		.then(
			function(response){

			})
	};
	
}),

myApp.controller('searchcontroller', function($scope, $http, $rootScope,$state, $stateParams,logger){
	$scope.product = function(val){
		$scope.value = val;
	};

	$scope.user = function(val){
		$scope.value = val;
	};

	$scope.email = function(val){
		$scope.value = val;
	};
	

	$scope.send = function () {
		var caseStr = $scope.value;
		switch (caseStr) {
			case 'product':
			$http.get('/search1', {params: { research: $scope.search}})
			.then(
				function(response){
					$state.go('search', {data: {donnee: response.data, valeur: true}});

				});
			break;
			case 'user':
			$http.get('/search', {params: { research: $scope.search}})
			.then(
				function(response){
					$state.go('search', {data: {donnee: response.data, valeur1: true}});
				});
			break;
			case 'email':
			$http.get('/search2', {params: { research: $scope.search}})
			.then(
				function(response){
					$state.go('search', {data: {donnee: response.data, valeur2: true}});
					
				});
			break;
			default:

		}
	};
	
	$scope.valu = $stateParams.data
	console.log($scope.valu);
	$scope.research = $stateParams.data;
	console.log($scope.research);
	
}),

myApp.controller('timercontroller', function($scope, $http, $rootScope,$state, logger, $interval){

	$http.get('/showprod', {params: {email: $rootScope.email}})
	.then(
		function(response){
			for (i = 0; i<=response.data.length; i++){
				var value = response.data[i];
				var countDownDate = new Date(value.enddate).getTime();
				var now = new Date().getTime();
				var distance = countDownDate - now;
				var days = Math.floor(distance / (1000 * 60 * 60 * 24));
				var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((distance % (1000 * 60)) / 1000);
				$scope.end = days + "d " + hours + "h ";
			};
		});
}),

myApp.controller('indexcontroller', function($scope, $http, $rootScope,$state, logger){

	

	$http.get('/affichage')
	.then(
		function(response){
			$scope.affichage = response.data;

		});

	$scope.scat = function(value){
		$state.val1 = value;
		$http.get('/subcat', {params: {name: value}})
		.then(
			function(response){
				$scope.sbcat = response.data;
			});
	};

	$scope.sbbcat = function(svalue){
		$state.val = svalue;
	};
}),

myApp.controller('researchcontroller', function($scope, $http, $rootScope,$state,$stateParams, logger){

$scope.sub = function(valo){

		$http.get('/foundprod', {params: {subcat: valo}})
		.then(
			function(response){
				var data =[];
			for (i=0; i< response.data.length; i++)
			{
				var value = response.data[i];
				var countDownDate = new Date(value.enddate).getTime();
				var now = new Date().getTime();
				var distance = countDownDate - now;
				var days = Math.floor(distance / (1000 * 60 * 60 * 24));
				var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((distance % (1000 * 60)) / 1000);
				$scope.end = days + "d " + hours + "h ";
				for(x=0;x < value.auctions.length;x++){
					var val = value.auctions[x];
				};
				var object = {
					id: value._id,
					name: value.name,
					description: value.description,
					auction: 'otot',
					price: value.price,
					end: $scope.end,
					email: 'toto',
				};
				data.push(object);
			};
			$scope.tata = 'hello';
			$state.go('affcategory', {data: data});

			});
	};
	$scope.cardo = $stateParams;
})