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

var scat = angular.module('scat', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/tracklist.html', controller: 'TracklistCtrl'}); 
    $routeProvider.when('/likes', {templateUrl: 'partials/likes.html', controller: 'LikesCtrl'}); 
    //$routeProvider.when('/user/:viewUser', {templateUrl: 'partials/tracklist.html', controller: 'TracklistCtrl'});
    //$routeProvider.when('/likes', {templateUrl: 'partials/likes.html', controller: 'TracklistCtrl'});
    //$routeProvider.when('/sets', {templateUrl: 'partials/sets.html', controller: 'TracklistCtrl'});
    $routeProvider.otherwise({ redirectTo: '/' });
    //$locationProvider.html5Mode(true);
    
    //var clientId = '66828e9e2042e682190d1fde4b02e265';
    
  }]);

  scat.factory('soundcloud', function() {
    // SoundCloud Init
    var clientId = '66828e9e2042e682190d1fde4b02e265';
    SC.initialize({
      client_id: clientId,
      redirect_uri: 'http://jxnblk.com/sc'
    });
    
    var smplayer = 'testing';
    
    return {
    
      clientid: clientId,
    
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
    
      test:   function($scope){
                console.log('test factory' + $scope.userName);
                $scope.userName = 'ran test';
              }
    };
  });
  
  
  // Peepcode player - need to strip this down for single track playback
  // 03 - swap artist for username

  //
  scat.factory('player', function(audio, $rootScope) {
    var player,
        paused = false,
        current = {
          //album: 0,
          track: null
        },
        // trying to get global-ish, currently playing var
        tracks = {}, 
        clientId = '66828e9e2042e682190d1fde4b02e265',

    player = {
      current: current,
      tracks: tracks,
      playing: false,

      play: function(tracks, i) {
              //if (!paused) audio.src = track.url;

        if (angular.isDefined(tracks)) { 
          current.tracks = tracks;
          current.track = i;
        };
        console.log('current track:' + current.track);
              
        audio.src = current.tracks[current.track].stream_url + '?client_id=' + clientId;;
        audio.play();
        player.playing = true;
        paused = false;
      },

      pause: function() {
        if (player.playing) {
          audio.pause();
          player.playing = false;
          current.track = null;
          paused = true;
        }
      },
      
      next: function() {
        if (current.tracks.length > (current.track + 1)) {
          current.track = current.track+1;
          if (player.playing) player.play();
        }    
      },

      reset: function() {
        player.pause();
      },

    };

    audio.addEventListener('ended', function() {
      $rootScope.$apply(player.next());
    }, false);

    return player;
  });

  scat.factory('audio', function($document) {
    var audio = $document[0].createElement('audio');
    return audio;
  }); 
  
  

  
  /*.factory('player', function(){
    var clientId = '66828e9e2042e682190d1fde4b02e265';
    //$rootScope.player = [];
    return {
      
      play:  function($scope, track){
        console.log($scope);
        console.log('jxn player plays: ' + track.title);
        //$scope.player.source = track.stream_url + '?client_id=' + clientId;
      },
      
      
    }  
  })*/


