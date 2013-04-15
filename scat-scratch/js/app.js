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
    $routeProvider.when('/likes', {templateUrl: 'partials/likes.html', controller: 'TracklistCtrl'});
    $routeProvider.when('/sets', {templateUrl: 'partials/sets.html', controller: 'TracklistCtrl'});
    //$locationProvider.html5Mode(true);
  }]).
  factory('soundcloud', function() {
    // SoundCloud Init
    var clientId = '66828e9e2042e682190d1fde4b02e265';
    SC.initialize({
      client_id: clientId,
      redirect_uri: 'http://jxnblk.com/sc'
    });
    
    var player;
    
    return {
    
      get:    function($scope){
                console.log($scope.scget);
                //remove offset here?
                SC.get($scope.scget, {limit: $scope.pageSize, offset: $scope.pageOffset}, function(tracks){
                  $scope.$apply(function () {
                    $scope.tracks = tracks;
                    $scope.tracksLoading = false;
                  });      
                });
              },
              
      getMore:  function($scope){
                  console.log($scope.scget);
                  SC.get($scope.scget, {limit: $scope.pageSize, offset: $scope.pageOffset}, function(tracks){
                    $scope.$apply(function () {
                      console.log(tracks);
                      $scope.tracks = $scope.tracks.concat(tracks);
                      $scope.tracksLoading = false;
                    });      
                  });
                },
              
      play:   function(track){
                SC.stream(track.stream_url, {preferFlash: false, useHTML5Audio: true}, function(sound){
                  if (player){
                    console.log(player.trackId);
                    console.log('found a player');
                    console.log(player);
                    player.pause();  
                  };
                  player = sound;
                  player.trackId = track.id;
                  console.log(player.sID);
                  player.play();
                  //track.playing = true;
                });      
              },
              
      pause:  function(){
                player.pause();
              },
              
      pauseAll: function(){
                  player.pauseAll();
                },
    
      test:   function($scope){
                console.log('test factory' + $scope.userName);
                $scope.userName = 'ran test';
              }
    };
  });


