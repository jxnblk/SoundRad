'use strict';

var scat = angular.module('scat', ['scat.services', 'scat.controllers']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    //$routeProvider.when('/', {templateUrl: 'partials/_tracklist.html', controller: 'NavCtrl'}); 
    $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/stream', {templateUrl: 'partials/stream.html', controller: 'StreamCtrl'});
    $routeProvider.when('/more', {templateUrl: 'partials/_navmore.html'});
    $routeProvider.when('/:viewUser', {templateUrl: 'partials/user.html', controller: 'UserTracksCtrl'});
    
    //$routeProvider.when('/:viewUser/:getType', {templateUrl: 'partials/user.html', controller: 'UserCtrl'});
    
    $routeProvider.when('/:viewUser/sets', {templateUrl: 'partials/user.html', controller: 'SetsCtrl'});
    $routeProvider.when('/:viewUser/likes', {templateUrl: 'partials/user.html', controller: 'LikesCtrl'});
    $routeProvider.when('/:viewUser/following', {templateUrl: 'partials/following.html', controller: 'FollowingCtrl'});
    
    // Need to work on this - rename to TrackDetail
    //$routeProvider.when('/:viewUser/:track', {templateUrl: 'partials/track.html', controller: 'TrackCtrl'});
    
    $routeProvider.otherwise({ redirectTo: '/' });
    //$locationProvider.html5Mode(true);
    
  }]);

  
  
  

   
  


