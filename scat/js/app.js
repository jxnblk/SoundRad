'use strict';

var scat = angular.module('scat', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/tracklist.html', controller: 'TracklistCtrl'}); 
    $routeProvider.when('/:viewUser', {templateUrl: 'partials/tracklist.html', controller: 'NavCtrl'});
    $routeProvider.when('/:viewUser/:getType', {templateUrl: 'partials/tracklist.html', controller: 'NavCtrl'});
    
    $routeProvider.otherwise({ redirectTo: '/' });
    //$locationProvider.html5Mode(true);
        // need to figure out how to define this globally
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
                
                //remove offset here?
                SC.get($scope.scget, {limit: $scope.pageSize, offset: $scope.pageOffset}, function(tracks){
                  $scope.$apply(function () {
                    $scope.tracks = tracks;
                    $scope.tracksLoading = false;
                  });      
                });
              },
              
      getMore:  function($scope){
                  SC.get($scope.scget, {limit: $scope.pageSize, offset: $scope.pageOffset}, function(tracks){
                    $scope.$apply(function () {
                      $scope.tracks = $scope.tracks.concat(tracks);
                      $scope.tracksLoading = false;
                    });      
                  });
                },
    
      test:   function($scope){
                console.log('test factory $scope');
                console.log($scope);
              }
    };
  });
  
  scat.factory('player', function(audio, $rootScope) {
    var player,
        paused = false,
        current = { track: null, title: null, time: 0 },
        tracks = {},
        clientId = '66828e9e2042e682190d1fde4b02e265',
        currentTimePercentage = audio.currentTime,

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
        // using this as an id for controller
        current.title = current.tracks[current.track].title;
        
        // Check if track is streamable
        // to-do -- Provide visual cues for disabled tracks
        if (!current.tracks[current.track].streamable) {
          console.log('not streamable - wtf');
          current.track = current.track + 1;
          current.title = current.tracks[current.track].title;
        };
        
        
        if (!paused) audio.src = current.tracks[current.track].stream_url + '?client_id=' + clientId;;
        
        audio.play();
        console.log('current time: ' + audio.currentTime);
        player.playing = true;
        paused = false;
      },

      pause: function() {
        console.log('current time: ' + audio.currentTime);
        if (player.playing) {
          audio.pause();
          player.playing = false;
          //current.track = null;
          // using this to show/hide play/pause buttons - probs a better way to do this
          current.title = null;
          paused = true;
        }
      },
      
      next: function() {
        console.log('current time: ' + audio.currentTime);
        if (current.tracks.length > (current.track + 1)) {
          current.track = current.track+1;
          if (player.playing) player.play();
        }    
      },
      
      previous: function() {
        if (!current.tracks.length) return;
        paused = false;
        // this is really janky with iphone system prev control
        current.track-1;
        if (player.playing) player.play();
      },
      
      seek: function(time) {
        audio.currentTime = time;
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
  


