var myApp = angular.module('myApp');

myApp.run(['$rootScope', function($rootScope){
    $rootScope.session = null;
}]);

myApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
    function($stateProvider, $locationProvider, $urlRouterProvider) { 
        // Système de routage
        $stateProvider
        .state("home", {
            url: '/', 
            templateUrl:'views/accueil.html',
            controller: ''
        })
        .state("newuser", {
            url: '/newuser', 
            templateUrl: 'views/register.html',
            controller: 'userController'
        })
        .state("login", {
            url: '/login', 
            templateUrl: 'views/login.html',
            controller: 'loginController',
         
        })
        .state("listuser", {
            url: '/listuser', 
            params: { param1: null },
            templateUrl: 'views/listuser.html',
            controller: 'showController',
         
        })
        .state("logout", {
            url: '/logout', 
            template: '',
            controller: 'logoutController',
        })
        .state('page',  {
            url: '/page',
            templateUrl: 'views/page.html',
            controller: 'pageController',
        })
        .state("chat", {
            url: '/chat',
            templateUrl: 'views/tchater.html',
            controller: 'tchaterController'
        })
         .state("search", {
            url: '/*',
            templateUrl: 'views/listuser.html',
            controller: 'searchController'
        })
                   
        $urlRouterProvider.otherwise('/index');
         $locationProvider.html5Mode(true);
    }
]);
