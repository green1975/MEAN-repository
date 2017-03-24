var myApp = angular.module('myApp');

myApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  // 
  // For any unmatched url, redirect to /state1 
  $urlRouterProvider.otherwise("/");
  // 
  // Now set up the states 
  $stateProvider
    .state('accueil', {
	      url: "/",
	      templateUrl: "views/accueil.html",
		  controller: "productcontroller"
    })
    .state("register", {
	      url: "/register",
	      templateUrl: "views/register.html",
	      controller: "registercontroller"
    })
    .state('login', {
	      url: "/login",
	      templateUrl: "views/login.html",
		  controller: "logincontroller"
    })
    .state('logout', {
	      url: "/logout",
	      templateUrl: "views/accueil.html",
	      controller: "logoutcontroller"
    })
	.state('user', {
	      url: "/user",
	      templateUrl: "views/user.html",
		  controller: "usercontroller"
	})
	.state('addproduct', {
	      url: "/addproduct",
	      templateUrl: "views/addproduct.html",
		  controller: "usercontroller"
	})
	.state('auction', {
	      url: "/auction",
	      templateUrl: "views/auction.html",
		  controller: "auctioncontroller"
	})
	.state('chat', {
		url: "/chat",
		templateUrl: "views/chat.html",
		// controller: "chatcontroller",
	})
	.state('search', {
		url: '/*',
		params: {data:null},
		templateUrl: "views/search.html",
		controller: "searchcontroller", function($stateParams){
		},
	})
	.state('timer', {
		url: '/timer',
		templateUrl: "views/timer.html",
		controller: "timercontroller",
	})
	.state('admin', {
		url: "/admin",
		params: {params1: null},
		templateUrl: "views/admin.html",
		controller: "admincontroller",
	})
	.state('affcategory', {
		url:'/affcategory',
		params:{data: null},
		templateUrl: "views/affcategory.html",
		controller:'researchcontroller', function($stateParams){
			},
	})
	.state('moduser', {
		url: "/moduser",
		params: {params1: null},
		templateUrl: "views/moduser.html",
		controller: "admincontroller",
	})
	.state('modproduct', {
		url: "/modproduct",
		params: {params1: null},
		templateUrl: "views/modproduct.html",
		controller: "admincontroller",
	})
	.state('myauction', {
		url: "/myauction",
		templateUrl: "views/myauction.html",
		controller: "auctioncontroller",
	})
	.state('modcategory', {
		url: "/modcategory",
		params: {params1: null},
		templateUrl: "views/modcategory.html",
		controller: "admincontroller",
	});
$locationProvider.html5Mode(true);
});