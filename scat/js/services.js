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
    
    return {
      clientId: clientId,
      
      connect:  function($scope, $location){
                  // may need to get rid of index # check
                  if($scope.connected && $scope.connectedUserIndex < 1){
                    //console.log('got local token & connecting...');
                    window.SC.storage().setItem('SC.accessToken', $scope.token); 
                  } else {
                    SC.connect(function() {
                      $scope.$apply(function () {
                        //console.log('connecting...');
                        SC.get('/me', function(me, error) { 
                          $scope.$apply(function () {
                            if (error){
                              alert('Error getting /me');
                            } else {
                              $scope.connected = true;
                              $scope.username = me.username;
                              localStorage.setItem('username-' + $scope.connectedUserIndex, $scope.username);
                              $scope.connectedUsers[$scope.connectedUserIndex] = $scope.username;
                              
                            }
                          });
                        });   
                        $scope.token = SC.accessToken();
                        localStorage.setItem('token-' + $scope.connectedUserIndex, $scope.token);
                        //$location.path('/stream');
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
                        //console.log('getting stream...');
                        //console.log(data);
                        // Iterate over stream data
                        tracks = [];
                        for (var i = 0; i < data.collection.length; i++) { 
                          
                          if (data.collection[i].type == 'favoriting') {
                            //console.log('favoriting? dont add this');
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
                            //console.log('its a playlist - parse this later');
                          } else {
                            //console.log('Its something else');
                            //console.log(data.collection[i].type);
                            //console.log(data.collection[i]);
                          }; 
                        };
                      
                        if(params.add){
                          //console.log('Adding to stream list');
                          $scope.tracks = $scope.tracks.concat(tracks);  
                        } else {
                          $scope.tracks = tracks;  
                        };
                      } else if(params.track){
                        //console.log('Handle as track detail');
                        $scope.tracks[0] = data;
                      } else if(params.add){
                        // Add non-stream tracks
                        // to-do: account for sets
                        //console.log('Adding tracks to list');
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
                      //console.log('getting user');
                      //console.log(data);
                      $scope.userData = data;
                    });
                  });
      },
      
      //{limit: 200, offset: $scope.pageOffset}
      getFollowings:  function($scope, user){
                        var initLimit = 200,
                            initOffset = 0;
                            
                        // Check against localStorage variations    
                        
                        var followings = [];
                        var getF = function(){
                          SC.get('/users/' + user + '/followings', {limit: initLimit, offset: initOffset}, function(data){
                            //console.log('offset: ' + initOffset);
                            $scope.$apply(function () {
                              //console.log('getting followings');
                              followings = followings.concat(data);
                              
                              // This might be against API TOS
                              //var dataString = JSON.stringify(data);
                              //localStorage.setItem(user + '-followings', dataString);                              
                              if (followings.length >= (initLimit + initOffset)){
                                //console.log('get some moar followins');
                                initOffset = initOffset + 200;
                                getF();
                              };
                              $scope.followings = followings;                             
                            });
                          });
                        };
                        getF();
                        
                        
      },
      
      like:   function($scope, trackid){
                SC.put('/me/favorites/' + trackid, function(){
                  //console.log('liked' + trackid);
                  $scope.liked = true;
                  $scope.track.user_favorite = true;
                });
      },
      
      unlike: function($scope, trackid){
                SC.delete('/me/favorites/' + trackid, function(){
                  //console.log('unliked' + trackid);  
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
  
  .factory('player', function(audio, $rootScope, soundcloud, $location) {
    var player,
        playing = false,
        paused = false,
        pausedTrack = null,
        current = { i: null, title: null, time: 0 },
        tracks = {},
        clientId = soundcloud.clientId,
        urlParams,
        token,
        currentTimePercentage = audio.currentTime;
        
    player = {
      current: current,
      tracks: tracks,
      playing: false,
      
      setToken: function($scope) {
        token = $scope.token;
      },

      play: function(tracks, i) {
        
        if (angular.isDefined(tracks)) { 
          current.tracks = tracks;
          current.i = i;
        };
          
        // using this as an id for controller
        current.title = current.tracks[current.i].title; 
        console.log('current.title: ' + current.title);
        // Check if track is streamable
        // to-do -- Provide visual cues for disabled tracks
        if (current.tracks[current.i].streamable == false) {
          console.log('not streamable - wtf');
          current.i = current.i + 1;
          current.title = current.tracks[current.i].title;
        };
        
        // Should define this more globally
        if (token && current.tracks[current.i].sharing == 'private'){
          urlParams = '?oauth_token=' + token;
        } else {
          urlParams =  '?client_id=' + clientId;
        };
          
        if (!paused || (pausedTrack != current.tracks[current.i])) {
          audio.src = current.tracks[current.i].stream_url + urlParams;  
          console.log('src: ' + audio.src);
        };
          
        audio.play();
        playing = true;
        paused = false;
        current.URL = $location.path();
        
        // Need to get scrolling working for this
        //current.URL = $location.path() + '#' + current.tracks[current.i].permalink;
      },
      
      
      // Testing for Track Detail View
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
        //console.log(current.tracks);
        //console.log(current.i);
        if(current.tracks[current.i].loop){
          //console.log('loop it');
          if (playing) player.play();
        } else if (current.tracks.length > (current.i + 1)) {
          current.i = current.i+1;
          if (playing) player.play();
        }    
      },
      
      previous: function() {
        if (!current.tracks.length) return;
        paused = false;
        // this is really janky with iphone system prev control
        current.i-1;
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
    
    // testing for system pause button control
    //audio.addEventListener('pause', function() {
      //$rootScope.$apply(player.pause());
    //}, false);
    

    return player;
  })
  
  
  .factory('audio', function($document, $rootScope) {
    var audio = $document[0].createElement('audio');  
    return audio;
  });
  