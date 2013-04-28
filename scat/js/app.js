'use strict';

var scat = angular.module('scat', ['scat.services', 'scat.controllers']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/home.html'});
    $routeProvider.when('/more', {templateUrl: 'partials/_navmore.html'});

    // User Views
    $routeProvider.when('/:viewUser', {templateUrl: 'partials/user.html', controller: 'UserTracksCtrl'});
    $routeProvider.when('/:viewUser/sets', {templateUrl: 'partials/user.html', controller: 'SetsCtrl', reloadOnSearch: false});
    $routeProvider.when('/:viewUser/likes', {templateUrl: 'partials/user.html', controller: 'LikesCtrl', reloadOnSearch: false});
    $routeProvider.when('/:viewUser/following', {templateUrl: 'partials/user.html', controller: 'FollowingCtrl', reloadOnSearch: false});
    
    // Detail Views
    $routeProvider.when('/:viewUser/:track', {templateUrl: 'partials/track.html', controller: 'TrackDetailCtrl', reloadOnSearch: false});
    $routeProvider.when('/:viewUser/sets/:set', {templateUrl: 'partials/set.html', controller: 'SetCtrl', reloadOnSearch: false});
    
    $routeProvider.otherwise({ redirectTo: '/' });
    //$locationProvider.html5Mode(true);
    
  }]);

  
  
  

   
  


