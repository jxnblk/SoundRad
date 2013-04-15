'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('sndcat', ['sndcat.services']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/likes', {templateUrl: 'partials/likes.html', controller: 'LikesCtrl'});
    $routeProvider.when('/sets', {templateUrl: 'partials/sets.html', controller: 'SetsCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);

  app.run(function($rootScope, $http) {
    
    // SC API Init
    $rootScope.clientId = '66828e9e2042e682190d1fde4b02e265';
    SC.initialize({
      client_id: $rootScope.clientId,
      redirect_uri: 'http://jxnblk.com/scat'
    });
    
    $rootScope.userName = 'not logged in';

    $rootScope.connect = function(){
      $rootScope.userName = 'trying to connect...';
    };
   
  });
  
