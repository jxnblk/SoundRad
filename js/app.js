'use strict';

var soundrad = angular.module('soundrad', ['soundrad.services', 'soundrad.controllers', 'ui.state']).
  config(['$stateProvider', '$routeProvider', '$locationProvider', function($stateProvider, $routeProvider, $locationProvider) {
/*
    $routeProvider.when('/', {templateUrl: '/partials/home.html'});    
    $routeProvider.when('/callback', {templateUrl: '/partials/callback.html'});
    $routeProvider.when('/settings', {templateUrl: '/partials/settings.html'});
    $routeProvider.when('/playing', {templateUrl: '/partials/playing.html'});

    $routeProvider.when('/:viewUser', {templateUrl: '/partials/user.html', controller: 'RouteCtrl'});
    $routeProvider.when('/:viewUser/:type', {templateUrl: '/partials/user.html', controller: 'RouteCtrl'});
    $routeProvider.when('/:viewUser/:type/:detail', {templateUrl: '/partials/user.html', controller: 'RouteCtrl'});
    
    $routeProvider.otherwise({redirectTo: '/'});
*/
    $stateProvider.state('home', { url: "/", templateUrl: "/partials/home.html" });
    $stateProvider.state('callback', { url: "/callback", templateUrl: "/partials/callback.html" });
    $stateProvider.state('settings', { url: "/settings", templateUrl: "/partials/settings.html" });
    $stateProvider.state('playing', { url: "/playing", templateUrl: "/partials/playing.html" });
    
    $stateProvider.state('user', { url: "/:user", templateUrl: "/partials/user.html", controller: 'UserCtrl' });
    $stateProvider.state('user.likes', { url: "/likes", templateUrl: "/partials/user.likes.html", controller: 'LikesCtrl' });
    $stateProvider.state('user.sets', { url: "/sets", templateUrl: "/partials/user.sets.html", controller: 'SetsCtrl' });
    $stateProvider.state('user.info', { url: "/info", templateUrl: "/partials/user.info.html", controller: 'InfoCtrl' });
    $stateProvider.state('user.track', { url: "/:track", templateUrl: "/partials/user.track.html", controller: 'TrackDetailCtrl' });
    $stateProvider.state('user.set', { url: "/sets/:set", templateUrl: "/partials/user.sets.set.html", controller: 'SetDetailCtrl' });


    //$locationProvider.hashPrefix('!')
    $locationProvider.html5Mode(true);
  }]);
