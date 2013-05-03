'use strict';

/* Services */

var clientId = '66828e9e2042e682190d1fde4b02e265';

angular.module('scat.services', [])
  
  .factory('soundcloud', function() {

    SC.initialize({
      client_id: clientId,
      redirect_uri: 'http://sndcmd.com/callback.html'
    });
    
    return {
      
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
                    }
                  });
                });
      },
      
      getUser:  function($scope, params){
                  SC.get('/users/' + $scope.viewUser, function(data){
                    $scope.$apply(function () {
                      $scope.userData = data;
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
      
      getSet:         function($scope, params){
                        SC.get('/resolve.json?url=http://soundcloud.com' + $scope.urlPath , function(data){
                          $scope.$apply(function () {
                            $scope.set = data;
                            $scope.tracks = data.tracks;
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
        
        //pausedTrack = null,
        //current = { i: null, title: null, time: 0 },
        tracks = {},
        i,
        urlParams,
        token,
        
        //currentTimePercentage = audio.currentTime;
        
    player = {
      //current: current,
      tracks: tracks,
      i: i,
      playing: false,
      paused: false,
      loop: false,
      
      setToken: function($scope) {
        token = $scope.token;
      },

      play: function(tracks, i) {
        player.tracks = tracks;
        
        // Should define this more globally
        if (token && tracks[i].sharing == 'private'){ urlParams = '?oauth_token=' + token;
        } else { urlParams =  '?client_id=' + clientId; };
          
        if (!player.paused || (player.paused != tracks[i])) {
          audio.src = tracks[i].stream_url + urlParams;  
        };
          
        audio.play();
        player.playing = tracks[i];
        player.i = i;
        player.paused = false;

      },

      pause: function(track) {
        if (player.playing) {
          audio.pause();
          player.playing = false;
          player.paused = track;
        }
      },
      
      stop: function(track) {
        audio.pause();
        player.playing = false;
        player.paused = false;
      },
      
      next: function() {
        if(player.loop){
          audio.currentTime = 0;
        } else {
          player.i = player.i+1;
        } 
        if (player.tracks.length > (player.i + 1) || player.loop) player.play(player.tracks, player.i);   
      },
      
      previous: function() {
        if (!current.tracks.length) return;
        player.paused = false;
        // this is really janky with iphone system prev control
        current.i-1;
        if (player.playing) player.play();
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
  
  .filter('playTime', function() {
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
  