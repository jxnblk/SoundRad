
'use strict';

var app = angular.module('app', ['ngTouch', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/', { templateUrl: '/partials/stream.html', controller: 'StreamCtrl' });
  $routeProvider.when('/callback', { templateUrl: '/partials/callback.html', controller: 'CallbackCtrl' });
  $routeProvider.when('/settings', { templateUrl: '/partials/settings.html', controller: 'SettingsCtrl' });
  $routeProvider.when('/search', { templateUrl: '/partials/search.html', controller: 'SearchCtrl' });
  $routeProvider.when('/:user', { templateUrl: '/partials/user.html', controller: 'UserCtrl' });
  $routeProvider.when('/:user/likes', { templateUrl: '/partials/likes.html', controller: 'LikesCtrl' });
  $routeProvider.when('/:user/sets', { templateUrl: '/partials/sets.html', controller: 'SetsCtrl' });
  $routeProvider.when('/:user/sets/:set/:secret?', { templateUrl: '/partials/set.html', controller: 'SetCtrl' });
  $locationProvider.html5Mode(true);
}]);

