'use strict';

var Token;

angular.module('soundrad.services', [])

  .factory('soundcloud', function($location, storage) {
  
    SC.initialize({
      client_id: clientID,
      redirect_uri: callbackUrl
    });
    
    return {

      reconnect: function(token) {
        window.SC.storage().setItem('SC.accessToken', token);
        Token = token;
      },
      
      connect: function(callback){
        SC.connect(function() {
          Token = SC.accessToken();
          storage.set('token', Token);
          SC.get('/me', callback);
        });
      },

      me: function(callback){
        SC.get('/me', callback);
      },

      getUser: function(user, callback){
        SC.get('/users/' + user, callback);
      },

      getUserPlaylists: function(callback){
        SC.get('/me/playlists', callback);
      },
      
      getTracks: function(url, params, callback){
        SC.get(url, params, callback);
      },
      
      getTrack: function(path, callback){
        SC.get('/resolve.json?url=http://soundcloud.com' + path, callback);
      },
      
      getSet: function(path, callback){
        SC.get('/resolve.json?url=http://soundcloud.com' + path, callback);
      },
      
      getStream: function(url, params, callback){
        SC.get(url, params, function(data){
          var tracks = [];
          for (var i = 0; i < data.collection.length; i++) {                               
            if (data.collection[i].type == 'track') {
              var track = data.collection[i].origin;
              tracks.push(track);
            } else if (data.collection[i].type == 'track-sharing') {
              var track = data.collection[i].origin.track;
              tracks.push(track);
            } else {
              console.error('Its something else');
              console.log(data.collection[i]);
            }; 
          };
          callback(data, tracks);
        });
      },

      getFollowings: function(user, callback){
        var initLimit = 128, initOffset = 0, followings = [],
            getF = function(){
              SC.get('/users/' + user + '/followings', {limit: initLimit, offset: initOffset}, function(data){
                followings = followings.concat(data);
                if (followings.length >= (initLimit + initOffset)){
                  initOffset = initOffset + initLimit;
                  getF();
                };
                callback(followings);
              });
            };
            getF();

      },
      
      getFollowers: function(user, callback){
        var initLimit = 128, initOffset = 0, followers = [],
            getF = function(){
              SC.get('/users/' + user + '/followers', {limit: initLimit, offset: initOffset}, function(data){
                followers = followers.concat(data);
                if (followers.length >= (initLimit + initOffset)){
                  initOffset = initOffset + initLimit;
                  getF();
                };
                callback(followers);
              });
            };
            getF();               
      },

      isFollowing: function(userid, callback){
        SC.get('/me/followings/'+userid+'?client_id='+clientID, callback);
        // I love how well this fucking works
      },

      follow: function(userid, callback){
        SC.put('/me/followings/'+userid, callback);
      },

      unfollow: function(userid, callback){
        SC.delete('/me/followings/'+userid, callback);
      },
      
      like: function(track, callback){
        SC.put('/me/favorites/' + track.id, callback);
      },
      
      unlike: function(track, callback){
        SC.delete('/me/favorites/' + track.id, callback);
      },

      createPlaylist: function(playlist, callback){
        SC.post('/playlists', playlist, callback);
      },

      addToPlaylist: function(track, playlist, callback){
        var tracks = [], i;
        for(i in playlist.tracks){
          tracks.push(playlist.tracks[i].id);
        };
        tracks.push(track.id);
        var tracks = tracks.map(function(id) { return { id: id } });
        SC.put(playlist.uri, { playlist: { tracks: tracks } }, callback);
      },

      removeFromPlaylist: function(track, playlist, callback){
        var tracks = [], i;
        for(i in playlist.tracks){
          if (playlist.tracks[i].id != track.id) tracks.push(playlist.tracks[i].id);
        };
        var tracks = tracks.map(function(id) { return { id: id } });
        SC.put(playlist.uri, { playlist: { tracks: tracks } }, callback);
      },

      updatePlaylist: function(playlist, callback){
        var tracks = [], i;
        for(i in playlist.tracks){
          tracks.push(playlist.tracks[i].id);
        };
        var tracks = tracks.map(function(id) { return { id: id } });
        SC.put(playlist.uri, { playlist: { tracks: tracks } }, callback);
      },
      
      resolve: function(path, callback){
        SC.get('/resolve.json?url=http://soundcloud.com' + path, callback);
      }
    };
  
  })
  
  
  ////////////////////////////////////////////////////////////////
  // Player Factory
  .factory('player', function(audio, soundcloud ) {
    var player, tracks, i, urlParams, currentTimePercentage = audio.currentTime;
        
    player = {
      tracks: tracks,
      i: i,
      playing: false,
      paused: false,
      loaded: false,
      play: function(tracks, i) {
        if (i == null) { 
          tracks = new Array(tracks);
          i = 0;
        };
        player.tracks = tracks;
        if (Token && tracks[i].sharing == 'private'){ urlParams = '?oauth_token=' + Token;
        } else { urlParams =  '?client_id=' + clientID; };
        if (player.paused != tracks[i] || player.loaded) audio.src = tracks[i].stream_url + urlParams;
        audio.play();
        player.playing = tracks[i];
        player.i = i;
        player.paused = false;
        player.loaded = false;
        // history.new(player.playing);
      },
      pause: function(track) {
        if (player.playing) {
          audio.pause();
          player.playing = false;
          player.paused = track;
        }
      },
      toggle: function() {
        if (player.playing) {
          player.pause(player.playing);
        } else if (player.paused) {
          player.play(player.tracks, player.i)
        } else {
          player.play(player.tracks, 0)
        }
      },
      stop: function() {
        audio.pause();
        player.playing = false;
        player.paused = false;
      },
      next: function() {
        if (player.tracks.length > player.i+1) {
          player.i = player.i+1;
          player.play(player.tracks, player.i);
        } else {
          //player.stop();
        };
      },
      prev: function() {
        if (player.i > 0) player.i = player.i-1;
        if (player.playing) player.play(player.tracks, player.i);
      },
      load: function(tracks){
        if (!Array.isArray(tracks)) {
          tracks = new Array(tracks);
        };
        player.tracks = tracks;
        player.i = 0;
        player.paused = tracks[0];
        player.loaded = true;
      }
    };
    audio.addEventListener('ended', function() {
      player.next();
    }, false);
    return player;
  })
  
  
  ////////////////////////////////////////////////////////////////
  // Audio Factory
  .factory('audio', function($document) {
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
      get: function(key, callback){
        var data = localStorage.getItem(key);
        var obj = JSON.parse(data);
        return obj;
      },
      clearAll: function(){
        localStorage.clear();
      }
    }     
  })

  .factory('history',['storage', function(storage){
    return {
      new: function(track){
        var history = [];
        history = storage.get('history');
        console.log(history);
        history.unshift(track);
        storage.set('history', history);
      }
    }
  }])


  
  
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
  
  
