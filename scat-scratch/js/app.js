'use strict';

/*
var app = angular.module('sndcat', ['sndcat.services']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/likes', {templateUrl: 'partials/likes.html', controller: 'LikesCtrl'});
    $routeProvider.when('/sets', {templateUrl: 'partials/sets.html', controller: 'SetsCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);
*/

var app = angular.module('scat', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  }]).
  factory('soundcloud', function() {
    // SoundCloud Init
    var clientId = '66828e9e2042e682190d1fde4b02e265';
    SC.initialize({
      client_id: clientId,
      redirect_uri: 'http://jxnblk.com/sc'
    });
    return {
    
      get:    function($scope){
                console.log('scget' + $scope.scget);
                SC.get($scope.scget, {limit: $scope.pageSize}, function(tracks){
                  $scope.$apply(function () {
                    $scope.tracks = tracks;
                  });    
                });
              },
    
      test:   function($scope){
                console.log('test factory' + $scope.userName);
                $scope.userName = 'ran test';
              }
    };
  });


// Controllers

function NavCtrl($scope, soundcloud) {
  
};
 
function HomeCtrl($scope, soundcloud) {

  $scope.userName = 'jxnblk';
  
  $scope.scget = '/users/' + $scope.userName + '/tracks';
  $scope.pageSize = 32;
  $scope.pageOffset = 0;

  soundcloud.get($scope);

  // update tracks in view
  $scope.updateTracks = function() {
    $scope.scget = '/users/' + $scope.userName + '/tracks';
    soundcloud.get($scope);
  };  
    
 
 
   /*
SC.get($scope.scget, {limit: $scope.pageSize}, function(tracks){
    $scope.$apply(function () {
      $scope.tracks = tracks;
    });   
  });
*/ 
  
}