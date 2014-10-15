app.factory('soundcloud', function($window, $http, storage) {

  var soundcloud = {};
  var token = storage.get('token');

  //soundcloud.api = 'https://api-v2.soundcloud.com';
  soundcloud.api = 'https://api.soundcloud.com';
  soundcloud.params = {
    client_id: clientID,
    oauth_token: token
  };

  soundcloud.connect = function(){
    $window.location.href = 'https://soundcloud.com/connect?client_id=' + clientID + '&redirect_uri=' + callbackUrl + '&response_type=code_and_token&scope=non-expiring&display=popup';
  };

  soundcloud.get = function(path, callback) {
    $http.get(this.api + path, { params: this.params })
    //$http.jsonp(this.api + path + '?client_id=' + clientID + '&oauth_token=' + token + '&callback=JSON_CALLBACK')
      .error(function(err) {
        console.log('error', err);
      })
      .success(function(data) {
        if (callback) callback(data);
      });
  };

  return soundcloud;

});
