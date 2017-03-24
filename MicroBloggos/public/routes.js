var myApp = angular.module('myApp');

myApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) { 
        // Système de routage
        $routeProvider
        .when('/', {
            templateUrl:'views/accueil.html',
            controller: ''
        })
        .when('/newuser', {
            templateUrl: 'views/register.html',
            controller: 'userController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginController',
         
        })
        .when('/listuser', {
            templateUrl: 'views/listuser.html',
            controller: 'showController',
         
        })
        .when('/logout', {
            template: '',
            controller: 'logoutController',
        })
        .when('/posts', {
            templateUrl: 'views/post.html',
            controller: 'postController',
        })
        .otherwise({
            redirect:'/views/newuser.html',
        });
         $locationProvider.html5Mode(true);
    }
]);



















 

 

 

 

 

 

 

 
