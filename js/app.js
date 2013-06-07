'use strict';

var soundrad = angular.module('soundrad', ['soundrad.services', 'soundrad.controllers']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: '/partials/home.html'});    
    $routeProvider.when('/callback', {templateUrl: '/partials/callback.html'});
    $routeProvider.when('/settings', {templateUrl: '/partials/settings.html'});

    $routeProvider.when('/:viewUser', {templateUrl: '/partials/user.html', controller: 'UserCtrl'});
    $routeProvider.when('/:viewUser/:type', {templateUrl: '/partials/user.html', controller: 'UserCtrl'});
    $routeProvider.when('/:viewUser/:type/:detail', {templateUrl: '/partials/user.html', controller: 'UserCtrl'});
    
    $routeProvider.otherwise({redirectTo: '/'});

    $locationProvider.hashPrefix('!')
    // Re-enable in production
    //$locationProvider.html5Mode(true);
  }]);
