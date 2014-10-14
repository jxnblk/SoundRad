'text use strict';

var app = angular.module('app', ['ngTouch', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/', { templateUrl: '/partials/stream.html', controller: 'StreamCtrl' });
  $routeProvider.when('/callback', { templateUrl: '/partials/callback.html', controller: 'CallbackCtrl' });
  $routeProvider.when('/settings', { templateUrl: '/partials/settings.html', controller: 'SettingsCtrl' });
  $routeProvider.when('/search', { templateUrl: '/partials/search.html', controller: 'SearchCtrl' });
  $routeProvider.when('/:user/:subpath?/:playlist?', { templateUrl: '/partials/user.html', controller: 'UserCtrl' });
  $locationProvider.html5Mode(true);
}]);

