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
    $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'TracklistCtrl'});
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
    return {
    
      get:    function($scope){
                //console.log('scget' + $scope.scget);
                SC.get($scope.scget, {limit: $scope.pageSize}, function(tracks){
                  $scope.$apply(function () {
                    $scope.tracks = tracks;
                    $scope.tracksLoading = false;
                  });      
                });
              },
              
      play:   function($scope, track){
                console.log('play' + track.title);
                //console.log($scope.sound);
                SC.stream(track.stream_url, {preferFlash: false, useHTML5Audio: true}, function(sound){
                  //$scope.sound = sound;
                  //sound.togglePause();
                  sound.togglePause();
                  console.log(track);
                  console.log(sound);
                });
                
                
                
                //var soundToPlay; 
                // first do async action
                /*SC.stream("/tracks/293", {
                  useHTML5Audio: true,
                  preferFlash: false
                }, function(sound) {
                  soundToPlay = sound;
                  document.querySelector('input').disabled = false;
                });*/
                
                /*function playTrack () {
                  soundToPlay.play();
                }*/
                
                
                
                
              },
      pause:  function($scope){
                track.playing = false;
                console.log('pause' + track.title); // + $scope.track.stream_url
                $scope.sound.pause();
              },
    
      test:   function($scope){
                console.log('test factory' + $scope.userName);
                $scope.userName = 'ran test';
              }
    };
  });


