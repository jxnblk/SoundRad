'use strict';

/* Services */

angular.module('scat.services', [])
  
  .factory('soundcloud', function() {
    // SoundCloud Init
    var clientId = '66828e9e2042e682190d1fde4b02e265';
    SC.initialize({
      client_id: clientId,
      redirect_uri: 'http://sndcmd.com/callback.html'
    });
    
    var connected = false,
        username = null,
        token = null;
    
    return {
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
                        SC.get('/me', function(me, error) { 
                          $scope.$apply(function () {
                            if (error){
                              alert('Error Getting');
                            } else {
                              $scope.connected = true;
                              $scope.username = me.username;
                              localStorage.setItem('username', $scope.username);
                            }
                          });
                        });
                        
                          $scope.token = SC.accessToken();
                          //console.log($scope.token);
                        
                        localStorage.setItem('token', $scope.token);
                      });
                    });
                  };
      },
    
      get:    function($scope, params){
                SC.get($scope.scget, {limit: $scope.pageSize, offset: $scope.pageOffset}, function(data){
                  $scope.$apply(function () {
                    
                    var tracks = [];
                    if(params){
                      // Handle Streams
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
                            //console.log('its a private track');
                            //console.log(data.collection[i]);
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
                      } else if(params.track){
                        console.log('Handle as track detail');
                        $scope.track = data;
                      } else if(params.add){
                        // Add non-stream tracks
                        // to-do: account for sets
                        console.log('Adding tracks to list');
                        tracks = data;
                        $scope.tracks = $scope.tracks.concat(tracks);
                      };
                      // Set next pagination link for stream
                      $scope.streamNextPage = data.next_href;                                 
                    } else {
                      // Handle default get 
                      tracks = data;
                      //console.log(data);
                      $scope.tracks = tracks;
                    };
                    $scope.tracksLoading = false;
                  });      
                });
      },
      
      getUser:  function($scope, params){
                  SC.get('/users/' + $scope.viewUser, function(data){
                    $scope.$apply(function () {
                      console.log('getting user');
                      //console.log(data);
                      $scope.userData = data;
                    });
                  });
      },
      
      like:   function($scope, trackid){
                SC.put('/me/favorites/' + trackid, function(){
                  console.log('liked' + trackid);
                  $scope.liked = true;
                  $scope.track.user_favorite = true;
                });
      },
      
      unlike: function($scope, trackid){
                SC.delete('/me/favorites/' + trackid, function(){
                  console.log('unliked' + trackid);  
                  $scope.liked = false;
                  $scope.track.user_favorite = false;
                });
      },

      test:   function($scope){
                console.log('test factory $scope');
                console.log($scope);
      }
    };
    
    //return soundcloud;
    
  })
  
  .factory('player', function(audio, $rootScope, soundcloud) {
    var player,
        playing = false,
        paused = false,
        pausedTrack = null,
        current = { track: null, title: null, time: 0 },
        tracks = {},
        clientId = soundcloud.clientId,
        urlParams,
        token = soundcloud.token,
        currentTimePercentage = audio.currentTime;

    player = {
      current: current,
      tracks: tracks,
      playing: false,

      play: function(tracks, i) {
        
        // Should define this more globally
        if (token){
          urlParams = '?oauth_token=' + token;
        } else {
          urlParams =  '?client_id=' + clientId;
        };
          
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
          
        if (!paused || (pausedTrack != current.tracks[current.track])) {
          audio.src = current.tracks[current.track].stream_url + urlParams;  
        };
          
        audio.play();
        playing = true;
        paused = false;
      },
      
      playSingle: function(track) {
        
        // Should define this more globally
        if (token){
          urlParams = '?oauth_token=' + token;
        } else {
          urlParams =  '?client_id=' + clientId;
        };
           
        // using this as an id for controller
        current.title = track.title; 
          
        if (!paused || (pausedTrack != track)) {
          audio.src = track.stream_url + urlParams;  
        };
          
        audio.play();
        playing = true;
        paused = false;
      },

      pause: function(track) {
        if (playing) {
          audio.pause();
          playing = false;
          // using this to show/hide play/pause buttons - probs a better way to do this
          current.title = null;
          paused = true;
          pausedTrack = track;
        }
      },
      
      next: function() {
        console.log(current.tracks);
        console.log(current.track);
        if (current.tracks.length > (current.track + 1)) {
          current.track = current.track+1;
          if (playing) player.play();
        }    
      },
      
      previous: function() {
        if (!current.tracks.length) return;
        paused = false;
        // this is really janky with iphone system prev control
        current.track-1;
        if (playing) player.play();
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
    
    //audio.addEventListener('pause', function() {
      //$rootScope.$apply(player.pause());
    //}, false);
    

    return player;
  })
  
  
  .factory('audio', function($document, $rootScope) {
    var audio = $document[0].createElement('audio');  
    return audio;
  });
  