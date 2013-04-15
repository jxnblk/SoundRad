'use strict';


/*
var app = angular.module('scat', ['scat.services']).
  value('version', '0.1').
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
  }]);
*/

var app = angular.module('scat', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
  }]).
  factory('soundcloud', function() {
    // Jxn's Scat API Key
    var clientId = '66828e9e2042e682190d1fde4b02e265';
    // SoundCloud Connect
    SC.initialize({
      client_id: clientId,
      redirect_uri: 'http://jxnblk.com/scat'
    });
    //console.log(clientId);
    
    return { 
      get:  function($scope, params, tracks) {
              SC.get(params.link, {limit: params.pageSize}, function(tracks){
                console.log('trying to get tracks...' + tracks);
              });
            },
  
      test: function() {
        console.log ('test'); 
      }    
    };
  });

// Controllers
 
function HomeCtrl($scope, soundcloud) {

  $scope.userName = 'jxnblk';
  $scope.scGetParams = {};
  $scope.scGetParams.link = '/users/jxnblk/tracks';
  $scope.scGetParams.pageSize = 32;
  $scope.scGetParams.pageOffset = 0;

  $scope.tracks = soundcloud.get($scope, $scope.scGetParams, function(tracks){
    $scope.tracks = tracks;    
  });


  
  // Test Button
  $scope.updateTracks = function() {
    //soundcloud.test();
    $scope.tracks = soundcloud.get($scope, $scope.scGetParams);
  };  
    
  
  
}