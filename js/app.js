'use strict';

var soundrad = angular.module('soundrad', ['soundrad.services', 'soundrad.controllers', 'soundrad.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/home.html'});
    $routeProvider.when('/more', {templateUrl: 'partials/_navmore.html'});
    $routeProvider.when('/activity', {templateUrl: 'partials/_activities.html'});
    $routeProvider.when('/callback', {templateUrl: 'partials/callback.html'});
    
    $routeProvider.when('/debug', {templateUrl: 'partials/debug.html'});
    
    
    $routeProvider.when('/:viewUser', {templateUrl: 'partials/user.html'});
    $routeProvider.when('/:viewUser/:type', {templateUrl: 'partials/user.html'});
    $routeProvider.when('/:viewUser/:type/:detail', {templateUrl: 'partials/user.html'});
    
    // User Views
//    $routeProvider.when('/:viewUser', {templateUrl: 'partials/user.html', controller: 'UserTracksCtrl'});
//    $routeProvider.when('/:viewUser/sets', {templateUrl: 'partials/user.html', controller: 'SetsCtrl'});
//    $routeProvider.when('/:viewUser/likes', {templateUrl: 'partials/user.html', controller: 'LikesCtrl'});
//    $routeProvider.when('/:viewUser/following', {templateUrl: 'partials/user.html', controller: 'FollowingCtrl'});
    
    // Detail Views
//    $routeProvider.when('/:viewUser/:track', {templateUrl: 'partials/track.html', controller: 'TrackDetailCtrl'});
//    $routeProvider.when('/:viewUser/sets/:set', {templateUrl: 'partials/set.html', controller: 'SetCtrl'});
    
    $routeProvider.otherwise({ redirectTo: '/' });
    
    $locationProvider.html5Mode(true);
    
  }]);

  
  
  

   
  


