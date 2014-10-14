app.factory('soundcloud', function($window, $http) {

  var soundcloud = {};

  soundcloud.api = 'https://api-v2.soundcloud.com';
  soundcloud.params = {
    client_id: clientID,
    callback: 'JSON_CALLBACK',
    offset: 0,
    limit: 16
  };

  soundcloud.connect = function(){
    $window.location.href = 'https://soundcloud.com/connect?client_id=' + clientID + '&redirect_uri=' + callbackUrl + '&response_type=code_and_token&scope=non-expiring&display=popup';
  };

  soundcloud.get = function(path, callback) {
    $http.jsonp(this.api + path, { params: this.params })
      .error(function(err) {
        console.log('error', err);
      })
      .success(function(data) {
        console.log('get', data);
        //if (callback) callback(data);
      });
  };

  return soundcloud;

});
