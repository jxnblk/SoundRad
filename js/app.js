'use strict';

var soundrad = angular.module('soundrad', ['soundrad.services', 'soundrad.controllers']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: '/partials/home.html'});    
    $routeProvider.when('/callback', {templateUrl: '/partials/callback.html'});
    $routeProvider.when('/settings', {templateUrl: '/partials/settings.html'});
    $routeProvider.when('/playing', {templateUrl: '/partials/playing.html'});

    $routeProvider.when('/:viewUser', {templateUrl: '/partials/user.html', controller: 'RouteCtrl'});
    $routeProvider.when('/:viewUser/:type', {templateUrl: '/partials/user.html', controller: 'RouteCtrl'});
    $routeProvider.when('/:viewUser/:type/:detail', {templateUrl: '/partials/user.html', controller: 'RouteCtrl'});
    
    $routeProvider.otherwise({redirectTo: '/'});

    $locationProvider.hashPrefix('!')
    $locationProvider.html5Mode(true);
  }]);
