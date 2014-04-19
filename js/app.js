'text use strict';

var soundrad = angular.module('soundrad', ['ngTouch', 'ngRoute', 'ui.sortable', 'infinite-scroll']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.when('/', { templateUrl: '/partials/home.html' });
    $routeProvider.when('/callback', { templateUrl: '/partials/callback.html' });
    $routeProvider.when('/settings', { templateUrl: '/partials/settings.html' });
    $routeProvider.when('/about', { templateUrl: '/partials/about.html' });
    $routeProvider.when('/search', { templateUrl: '/partials/search.html', controller: 'SearchCtrl' });

    $routeProvider.when('/:user/:subpath?/:setTitle?', { templateUrl: '/partials/user.html', controller: 'UserCtrl' });

    /*
    $stateProvider.state('playing', { url: '/playing', templateUrl: '/partials/playing.html' });
    $stateProvider.state('history', { url: '/history', templateUrl: '/partials/history.html', controller: 'HistoryCtrl' });
    */
    $locationProvider.html5Mode(true);
  }]);

