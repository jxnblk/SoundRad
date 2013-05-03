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
      
      connect:  function($scope){
                  if($scope.connected && $scope.connectedUserIndex < 1){
                    window.SC.storage().setItem('SC.accessToken', $scope.token); 
                  } else {
                    SC.connect(function() {
                      $scope.$apply(function () {
                        SC.get('/me', function(me, error) { 
                          $scope.$apply(function () {
                            if (error){
                              alert('Error getting /me');
                            } else {
                              $scope.connected = true;
                              $scope.me = me;
                              $scope.username = me.username;
                              localStorage.setItem('username-' + $scope.connectedUserIndex, $scope.username);
                              $scope.connectedUsers[$scope.connectedUserIndex] = $scope.username;
                            }
                          });
                        });   
                        $scope.token = SC.accessToken();
                        localStorage.setItem('token-' + $scope.connectedUserIndex, $scope.token);
                      });
                    });
                  };
      },

   // Don't think I'm using this ATM  
      getMe:  function($scope){
                SC.get('/me', function(me, error) { 
                  $scope.$apply(function () {
                    if (error){
                      alert('Error getting /me');
                    } else {
                      $scope.connected = true;
                      $scope.me = me;
                      $scope.username = me.username;
                      //localStorage.setItem('username-' + $scope.connectedUserIndex, $scope.username);
                      //$scope.connectedUsers[$scope.connectedUserIndex] = $scope.username;
                    }
                  });
                });
      },
      
      getUser:  function($scope, params){
                  //console.log('get user');
                  SC.get('/users/' + $scope.viewUser, function(data){
                    $scope.$apply(function () {
                      $scope.userData = data;
                      // replace viewUser once loaded
                      $scope.viewUsername = $scope.userData.username;
                    });
                  });
      },
    
      getTracks:      function($scope, params){                
                        SC.get($scope.scget, {limit: $scope.pageSize, offset: $scope.pageOffset}, function(data){
                          $scope.$apply(function () {
                            $scope.tracks = data;
                            $scope.tracksLoading = false;
                          });      
                        });
      },
      
      addTracks:      function($scope){
                        SC.get($scope.scget, {limit: $scope.pageSize, offset: $scope.pageOffset}, function(data){
                          $scope.$apply(function(){
                            $scope.tracks = $scope.tracks.concat(data);
                            $scope.tracksLoading = false;
                          });
                        });
      },    
      
      getStream:      function($scope, params){
                        SC.get($scope.scget, {limit: $scope.pageSize, offset: $scope.pageOffset}, function(data){
                          $scope.$apply(function () {
                            var tracks = [];
                            for (var i = 0; i < data.collection.length; i++) {                               
                              if (data.collection[i].type == 'track') {
                                var track = data.collection[i].origin;
                                tracks.push(track);
                              } else if (data.collection[i].type == 'track-sharing') {
                                var track = data.collection[i].origin.track;
                                tracks.push(track);
                              } else {
                                console.log('Its something else');
                                console.log(data.collection[i]);
                              }; 
                            };
                            if (params){
                              if (params.add){
                                $scope.tracks = $scope.tracks.concat(tracks);
                              } else {
                                console.log('unknown param');
                              };
                            } else {
                              $scope.tracks = tracks;  
                            };
                            $scope.tracksLoading = false;
                            $scope.streamNextPage = data.next_href;
                          });
                        });
      },
      
      getActivities:  function($scope, params) {
                        SC.get($scope.scget, {limit: $scope.pageSize, offset: $scope.pageOffset}, function(data) {
                          $scope.$apply(function(){
                            var activities = [];
                            for (var i = 0; i < data.collection.length; i++) {
                              if (data.collection[i].type == 'favoriting') {
                                activities.push(data.collection[i]);
                              } else {
                                //console.log('not a favoriting');
                                //console.log(data.collection[i]);
                              };
                            };
                            if (params) {
                              if (params.add) {
                                $scope.activities = $scope.activities.concat(activities);  
                              };
                            } else {
                              $scope.activities = activities;
                            };
                            $scope.tracksLoading = false;
                          });
                        });
      },
      
      getTrack:       function($scope, params){
                        SC.get('/resolve.json?url=http://soundcloud.com' + $scope.urlPath , function(data){
                          $scope.$apply(function () {
                            $scope.tracks = new Array(data);
                            $scope.tracksLoading = false;
                          });
                        });
      },
      
      getFollowings:  function($scope, user){
                        var initLimit = 200,
                            initOffset = 0,                        
                            followings = [],
                            getF = function(){
                              SC.get('/users/' + user + '/followings', {limit: initLimit, offset: initOffset}, function(data){
                                $scope.$apply(function () {
                                  followings = followings.concat(data);
                                  if (followings.length >= (initLimit + initOffset)){
                                    initOffset = initOffset + 200;
                                    getF();
                                  }; 
                                  $scope.followings = followings;
                                  $scope.tracksLoading = false;
                                });
                              });
                        };
                        getF();
                        
                        
      },

////////////////////////////////
      
//      /users/{id}/followings/{id}
      checkFollowing:
              function(userid){
                SC.get('/me/followings/' + userid , function(data){
                  //$apply(function () {
                    //console.log('resolved data');
                    console.log(data);
                    //$scope.resolveData = data;
                  //});
                });
      },


// work on this
      follow:
              function(userid){
                SC.put('/me/favorites/' + trackid, function(){
                  //console.log('liked' + trackid);
                  $scope.$apply(function () {
                    $scope.liked = true;
                    $scope.track.user_favorite = true;
                  });
                });
      },
      
////////////////////////////////
      
      like:   function($scope, trackid){
                SC.put('/me/favorites/' + trackid, function(){
                  //console.log('liked' + trackid);
                  $scope.$apply(function () {
                    $scope.liked = true;
                    $scope.track.user_favorite = true;
                  });
                });
      },
      
      unlike: function($scope, trackid){
                SC.delete('/me/favorites/' + trackid, function(){
                  //console.log('unliked' + trackid);  
                  $scope.$apply(function () {
                    $scope.liked = false;
                    $scope.track.user_favorite = false;
                  });
                });
      },
      
      resolve: function($scope, params){
                // http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/matas/hobnotropic&client_id=YOUR_CLIENT_ID
                SC.get('/resolve.json?url=http://soundcloud.com' + $scope.urlPath , function(data){
                  $scope.$apply(function () {
                    //console.log('resolved data');
                    //console.log(data);
                    $scope.resolveData = data;
                  });
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
        //console.log('current.title: ' + current.title);
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
          //console.log('src: ' + audio.src);
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
          if (playing) audio.currentTime = 0;
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

    return player;
  })
  
  
  .factory('audio', function($document, $rootScope) {
    var audio = $document[0].createElement('audio');  
    return audio;
  })
  
  .filter('fromNow', function() {
    return function(dateString) {
      return moment(new Date(dateString)).fromNow();
    };
  })
  
  .filter('playerTime', function() {
    return function(ms) {
      var hours = Math.floor(ms / 36e5),
          mins = '0' + Math.floor((ms % 36e5) / 6e4),
          secs = '0' + Math.floor((ms % 6e4) / 1000);
            mins = mins.substr(mins.length - 2);
            secs = secs.substr(secs.length - 2);
      if (hours){
        return hours+':'+mins+':'+secs;  
      } else {
        return mins+':'+secs;  
      }; 
    };
  });
  