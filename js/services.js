'use strict';

/* Services */


var Token;

angular.module('soundrad.services', [])

  .factory('soundcloud', function($location, storage) {
  
    SC.initialize({
      client_id: clientID,
      redirect_uri: callbackUrl
    });
    
    return {
      
      connect: function($scope){
        if($scope.me){
          window.SC.storage().setItem('SC.accessToken', $scope.token);
          Token = $scope.token;
        } else {
          SC.connect(function() {
            $scope.$apply(function () {
              SC.get('/me', function(me, error) { 
                $scope.$apply(function () {
                  if (error){
                    console.log('Error getting /me');
                  } else {
                    $scope.me = me;
                    storage.set('me', me);
                  };
                  $location.path('/');
                });
              });   
              Token = SC.accessToken();
              $scope.token = Token;
              storage.set('token', Token);
              
            });
          });
        };
      },
      
      getUser: function($scope, params){
        SC.get('/users/' + $scope.viewUser, function(data){
          $scope.$apply(function () {
            $scope.userData = data;
            $scope.viewUsername = data.username;
          });
        });
      },
      
      getTracks: function($scope, params){  
        //console.log('getTracks offset: ' + $scope.pageOffset);              
        SC.get($scope.scget, {limit: $scope.pageSize, offset: $scope.pageOffset}, function(data){
          $scope.$apply(function () {
            $scope.tracks = data;
            $scope.hasPrevPage = ($scope.pageOffset >= $scope.pageSize);
            $scope.hasNextPage = ($scope.tracks.length >= $scope.pageSize);
            $scope.contentLoading = false;
          });      
        });
      },
      
      getTrack: function($scope, params){
        SC.get('/resolve.json?url=http://soundcloud.com' + $scope.urlPath , function(data){
          $scope.$apply(function () {
            $scope.tracks = new Array(data);
            $scope.track = data;
            $scope.hasPrevPage = false;
            $scope.hasNextPage = false;
            $scope.contentLoading = false;
          });
        });
      },
      
      getSet: function($scope, params){
        SC.get('/resolve.json?url=http://soundcloud.com' + $scope.urlPath , function(data){
          $scope.$apply(function () {
            $scope.set = data;
            $scope.tracks = data.tracks;
            $scope.hasPrevPage = false;
            $scope.hasNextPage = false;
            $scope.contentLoading = false;
          });
        });
      },
      
      getStream: function($scope, add){
        //console.log('getstream pageoffset' + $scope.pageOffset);
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
            if (add == true) {
              $scope.tracks = $scope.tracks.concat(tracks);
            } else {
              $scope.tracks = tracks;
            };
            $scope.hasPrevPage = false;
            $scope.hasNextPage = false;  
            $scope.contentLoading = false;
            $scope.streamNextPage = data.next_href;
            //$scope.streamPrevPage = data.future_href;
          });
        });
      },

      getFollowings: function($scope, user){
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
                  $scope.contentLoading = false;
                });
              });
        };
        getF();               
      },
      
      getFollowers: function($scope, user){
        var initLimit = 128,
            initOffset = 0,                        
            followers = [],
            getF = function(){
              SC.get('/users/' + user + '/followers', {limit: initLimit, offset: initOffset}, function(data){
                $scope.$apply(function () {
                  followers = followers.concat(data);
                  if (followers.length >= (initLimit + initOffset)){
                    initOffset = initOffset + 128;
                    getF();
                  }; 
                  $scope.followers = followers;
                  $scope.contentLoading = false;
                });
              });
        };
        getF();               
      },
      
      like: function($scope, trackid){
        SC.put('/me/favorites/' + trackid, function(){
        });
      },
      
      unlike: function($scope, trackid){
        SC.delete('/me/favorites/' + trackid, function(){
        });
      },
      
      resolve: function($scope, params){
        SC.get('/resolve.json?url=http://soundcloud.com' + $scope.urlPath , function(data){
          $scope.$apply(function () {
            $scope.resolvedData = data;
          });
        });
      }
    };
  
  })
  
  
  ////////////////////////////////////////////////////////////////
  // Player Factory
  .factory('player', function($rootScope, audio, soundcloud) {
    var player,
        tracks,
        i,
        urlParams,
        currentTimePercentage = audio.currentTime;
        
    player = {
      tracks: tracks,
      i: i,
      playing: false,
      paused: false,
      play: function(tracks, i) {
        if (i == null) {
          tracks = new Array(tracks);
          i = 0;
        };
        player.tracks = tracks;
        if (Token && tracks[i].sharing == 'private'){ urlParams = '?oauth_token=' + Token;
        } else { urlParams =  '?client_id=' + clientID; };
        if (player.paused != tracks[i]) {
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
        player.i = player.i+1;
        if (player.tracks.length > (player.i + 1)) player.play(player.tracks, player.i);   
      },
      prev: function() {
        player.i = player.i-1;
        if (player.playing) player.play(player.tracks, player.i);
      }
    };
    audio.addEventListener('ended', function() {
      $rootScope.$apply(player.next());
    }, false);
    return player;
  })
  
  
  ////////////////////////////////////////////////////////////////
  // Audio Factory
  .factory('audio', function($document, $rootScope) {
    var audio = $document[0].createElement('audio');  
    return audio;
  })
  
  
  ////////////////////////////////////////////////////////////////
  // Local Storage Factory
  .factory('storage', function(){            
    return {
      set: function(key, obj){
        var string = JSON.stringify(obj)
        localStorage.setItem(key, string);
      },
      get: function(key){
        var data = localStorage.getItem(key);
        var obj = JSON.parse(data);
        return obj;
      },
      clearAll: function(){
        localStorage.clear();
      }
    }     
  })


  ////////////////////////////////////////////////////////////////
  // Bookmarks

  // .factory('bookmarkService', function(storage){
  //   return {
      
  //   }
  // })
  
  
  ////////////////////////////////////////////////////////////////
  // Filters
  
  // Converts dates to relative time
  .filter('fromNow', function() {
    return function(dateString) {
      return moment(new Date(dateString)).fromNow();
    };
  })
  
  // Converts milliseconds to hours, minutes, seconds
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
  })
  
  // Filters text from JSON objects
  .filter('richtext', function () {
    return function(text) {
      if(text){
        return text.replace(/\n/g, '<br/>');
      };
    };
  })
  
  // Escapes text for URL encoding
  .filter('escape', function() {
    return function(text){
      if(text){
        return text.escape;
      };
    };
  });
  
  
