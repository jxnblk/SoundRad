
'use strict';

app.factory('soundcloud', function($window, $http, storage) {

  var soundcloud = {};
  var token = storage.get('token');

  soundcloud.api = 'https://api.soundcloud.com';
  soundcloud.params = {
    client_id: clientID,
    oauth_token: token,
    offset: 0,
    limit: 24
  };

  soundcloud.next_href = null;

  soundcloud.connect = function(){
    $window.location.href = 'https://soundcloud.com/connect?client_id=' + clientID + '&redirect_uri=' + callbackUrl + '&response_type=code_and_token&scope=non-expiring&display=popup';
  };

  soundcloud.get = function(path, callback) {
    this.params.url = null;
    this.params.callback = null;
    $http.get(this.api + path, { params: this.params })
      .error(function(err) {
        console.error('error', err);
      })
      .success(function(data) {
        if (callback) callback(data);
      });
  };

  soundcloud.jsonp = function(path, callback) {
    this.params.callback = 'JSON_CALLBACK';
    $http.jsonp(this.api + path + '.json', { params: this.params })
      .error(function(err) {
        console.error('error', err);
      })
      .success(function(data) {
        if (callback) callback(data);
      });
  };

  soundcloud.getStream = function(callback) {
    this.params.callback = null;
    this.params.url = null;
    $http.get(this.api + '/me/activities/tracks', { params: this.params })
      .error(function(err) {
        console.error('error', err);
      })
      .success(function(data) {
        soundcloud.next_href = data.next_href;
        var tracks = [];
        for (var i = 0; i < data.collection.length; i++) {
          tracks.push(data.collection[i].origin);
        }
        if (callback) callback(tracks);
      });
  };

  soundcloud.getStreamNextPage = function(callback) {
    $http.get(this.next_href, { params: this.params })
      .error(function(err) {
        console.error('error', err);
      })
      .success(function(data) {
        soundcloud.next_href = data.next_href;
        var tracks = [];
        for (var i = 0; i < data.collection.length; i++) {
          tracks.push(data.collection[i].origin);
        }
        if (callback) callback(tracks);
      });
  };

  return soundcloud;

});
