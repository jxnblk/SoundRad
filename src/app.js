
'use strict';

var app = angular.module('app', ['ngTouch', 'ngRoute', 'cfp.hotkeys']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/', { templateUrl: '/partials/stream.html', controller: 'StreamCtrl' });
  $routeProvider.when('/about', { templateUrl: '/partials/about.html' });
  $routeProvider.when('/:user', { templateUrl: '/partials/user.html', controller: 'UserCtrl' });
  $routeProvider.when('/:user/likes', { templateUrl: '/partials/likes.html', controller: 'LikesCtrl' });
  $routeProvider.when('/:user/sets', { templateUrl: '/partials/sets.html', controller: 'SetsCtrl' });
  $routeProvider.when('/:user/sets/:set/:secret?', { templateUrl: '/partials/set.html', controller: 'SetCtrl' });
  $routeProvider.otherwise({ redirectTo: '/' });
  $locationProvider.html5Mode(true);
}]);

