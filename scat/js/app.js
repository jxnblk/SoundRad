'use strict';

var scat = angular.module('scat', []).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    //$routeProvider.when('/', {templateUrl: 'partials/_tracklist.html', controller: 'TracklistCtrl'}); 
    $routeProvider.when('/stream', {templateUrl: 'partials/stream.html', controller: 'StreamCtrl'});
    $routeProvider.when('/:viewUser', {templateUrl: 'partials/user.html', controller: 'UserCtrl'});
    $routeProvider.when('/:viewUser/:getType', {templateUrl: 'partials/user.html', controller: 'UserCtrl'});
    
    $routeProvider.otherwise({ redirectTo: '/jxnblk' });
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
      clientId: clientId,
      
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
                SC.get($scope.scget, {limit: $scope.pageSize, offset: $scope.pageOffset}, function(data){
                  $scope.$apply(function () {
                    // Handle Streams
                    var tracks = [];
                    if(params){
                      if(params.stream){
                        console.log('getting stream...');
                        //console.log(data);
                        // Iterate over stream data
                        tracks = [];
                        for (var i = 0; i < data.collection.length; i++) { 
                          
                          if (data.collection[i].type == 'favoriting') {
                            console.log('favoriting? dont add this');
                            //console.log(data.collection[i]);
                            //var track = data.collection[i].origin.track;
                            //tracks.push(track);
                          } else if (data.collection[i].type == 'track') {
                            //console.log('Its a track (type)!');
                            //console.log(data.collection[i].origin);
                            var track = data.collection[i].origin;
                            tracks.push(track);
                          } else if (data.collection[i].type == 'track-sharing') {
                            console.log('its a private track');
                            console.log(data.collection[i]);
                            var track = data.collection[i].origin.track;
                            tracks.push(track);
                          } else if (data.collection[i].type == 'playlist') {
                            console.log('its a playlist - parse this later');
                          } else {
                            console.log('Its something else');
                            console.log(data.collection[i].type);
                            console.log(data.collection[i]);
                          };
                          
                        };
                      
                        if(params.add){
                          console.log('Adding to stream list');
                          $scope.tracks = $scope.tracks.concat(tracks);  
                        } else {
                          $scope.tracks = tracks;  
                        };    
                      } else if(params.add){
                        // Add non-stream tracks
                        console.log('Adding tracks to list');
                        tracks = data;
                        $scope.tracks = $scope.tracks.concat(tracks);
                      };
                      // Set next pagination link for stream
                      $scope.streamNextPage = data.next_href;                                 
                    } else {
                      // Handle default get 
                      tracks = data;
                      $scope.tracks = tracks;
                    };
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
  
  scat.factory('player', function(audio, $rootScope, soundcloud) {
    var player,
        paused = false,
        pausedTrack = null,
        current = { track: null, title: null, time: 0 },
        tracks = {},
        clientId = soundcloud.clientId,
        token = soundcloud.token,
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
        if (current.tracks[current.track].streamable == false) {
          console.log('not streamable - wtf');
          current.track = current.track + 1;
          current.title = current.tracks[current.track].title;
        };
        
        // to-do: add access token for private tracks
        //if ($scope.token) console.log($scope.token);
        if (!paused || (pausedTrack != current.tracks[current.track])) {
          if (token){
            audio.src = current.tracks[current.track].stream_url + '?oauth_token=' + token;
            console.log(audio.src);
          } else {
            audio.src = current.tracks[current.track].stream_url + '?client_id=' + clientId;  
            console.log(audio.src);
          };
        };
        audio.play();
        player.playing = true;
        paused = false;
      },

      pause: function(track) {
        if (player.playing) {
          audio.pause();
          player.playing = false;
          // using this to show/hide play/pause buttons - probs a better way to do this
          current.title = null;
          paused = true;
          pausedTrack = track;
        }
      },
      
      next: function() {
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
  


