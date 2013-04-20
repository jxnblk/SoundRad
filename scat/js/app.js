'use strict';

var scat = angular.module('scat', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/tracklist.html', controller: 'TracklistCtrl'}); 
    $routeProvider.when('/:viewUser', {templateUrl: 'partials/tracklist.html', controller: 'NavCtrl'});
    $routeProvider.when('/:viewUser/:getType', {templateUrl: 'partials/tracklist.html', controller: 'NavCtrl'});
    //$routeProvider.when('/stream', {templateUrl: 'partials/tracklist.html', controller: 'NavCtrl'});
    
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
      redirect_uri: 'http://jxnblk.com/scat/callback.html'
    });
    
    var connected = false,
        username = null,
        token = null,
    
    soundcloud = {
      connected: connected,
      username: username,
      token: token,
      clientid: clientId,
      
      connect:  function($scope){
                  if($scope.connected){
                    console.log('got local token & connecting...');
                    // this is factory stuff, right?
                    //window.SC.storage().setItem('SC.accessToken', $scope.token); 
                  } else {
                    SC.connect(function() {
                      $scope.$apply(function () {
                        console.log('connecting...');
                        SC.get('/me', function(me) { 
                          $scope.$apply(function () { 
                            $scope.connected = true;
                            $scope.username = me.username;
                            localStorage.setItem('username', $scope.username);
                          });
                        });
                        $scope.token = SC.accessToken();
                        localStorage.setItem('token', $scope.token);
                      });
                    });
                  };
                },
    
      get:    function($scope, params){
                //console.log(params);
                SC.get($scope.scget, {limit: $scope.pageSize, offset: $scope.pageOffset}, function(data){
                  console.log(data);
                  $scope.$apply(function () {
                    var tracks = [];
                    if(data.collection){
                      console.log(data.next_href);
                      $scope.streamNextPage = data.next_href;
                      // Looks like a stream - probs need to account for non-collection data
                      for (var i = 0; i < data.collection.length; i++) { 
                        var track = data.collection[i].origin;
                        tracks.push(track);
                      };
                    } else {
                      // Interpreting as tracks
                      tracks = data;
                    };
                    if (params) {
                      //console.log(params.add);  // may need to account for other params
                      console.log('need to add these');
                      $scope.tracks = $scope.tracks.concat(tracks);
                    } else {
                      console.log('replace all the tracks');
                      $scope.tracks = tracks;
                    };
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
    
    return soundcloud;
    
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
        
        // Causing a bug when switching views
        //if (!paused) audio.src = current.tracks[current.track].stream_url + '?client_id=' + clientId;;
        audio.src = current.tracks[current.track].stream_url + '?client_id=' + clientId;;
        
        audio.play();
        player.playing = true;
        paused = false;
      },

      pause: function() {
        if (player.playing) {
          audio.pause();
          player.playing = false;
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
  


