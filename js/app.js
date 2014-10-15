// Beta config
var clientID = '66828e9e2042e682190d1fde4b02e265';
var callbackUrl = 'http://beta.soundrad.com/callback';
// Official config
// var clientID = '683f27c0c6dace16e7498ebffcbef8be';
// var callbackUrl = 'http://soundrad.com/callback';
'text use strict';
var app = angular.module('app', [
    'ngTouch',
    'ngRoute'
  ]);
app.config([
  '$routeProvider',
  '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: '/partials/stream.html',
      controller: 'StreamCtrl'
    });
    $routeProvider.when('/callback', {
      templateUrl: '/partials/callback.html',
      controller: 'CallbackCtrl'
    });
    $routeProvider.when('/settings', {
      templateUrl: '/partials/settings.html',
      controller: 'SettingsCtrl'
    });
    $routeProvider.when('/search', {
      templateUrl: '/partials/search.html',
      controller: 'SearchCtrl'
    });
    $routeProvider.when('/:user/:subpath?/:playlist?', {
      templateUrl: '/partials/user.html',
      controller: 'UserCtrl'
    });
    $locationProvider.html5Mode(true);
  }
]);
app.factory('soundcloud', [
  '$window',
  '$http',
  'storage',
  function ($window, $http, storage) {
    var soundcloud = {};
    var token = storage.get('token');
    //soundcloud.api = 'https://api-v2.soundcloud.com';
    soundcloud.api = 'https://api.soundcloud.com';
    soundcloud.params = {
      client_id: clientID,
      oauth_token: token
    };
    soundcloud.connect = function () {
      $window.location.href = 'https://soundcloud.com/connect?client_id=' + clientID + '&redirect_uri=' + callbackUrl + '&response_type=code_and_token&scope=non-expiring&display=popup';
    };
    soundcloud.get = function (path, callback) {
      $http.get(this.api + path, { params: this.params }).error(function (err) {
        console.log('error', err);
      }).success(function (data) {
        if (callback)
          callback(data);
      });
    };
    return soundcloud;
  }
]);
app.factory('storage', function () {
  return {
    set: function (key, obj) {
      var string = JSON.stringify(obj);
      localStorage.setItem(key, string);
    },
    get: function (key, callback) {
      var data = localStorage.getItem(key);
      var obj = JSON.parse(data);
      return obj;
    },
    clear: function () {
      localStorage.clear();
    }
  };
});
app.controller('MainCtrl', [
  '$scope',
  '$window',
  '$location',
  'storage',
  'soundcloud',
  function ($scope, $window, $location, storage, soundcloud) {
    $scope.currentUser = storage.get('currentUser');
    $scope.token = storage.get('token');
    // Get token from URL hash
    if ($location.hash()) {
      var token = $location.hash().replace('#', '').split('&')[0].split('=')[1];
      if (token) {
        storage.set('token', token);
        $scope.token = token;
        soundcloud.params.oauth_token = token;
        soundcloud.get('/me', function (data) {
          $scope.currentUser = data;
          storage.set('currentUser', data);
          console.log('me', data);
        });
        $location.search('');
        $location.hash('');
      }
      ;
    }
    ;
    $scope.connect = soundcloud.connect;
    $scope.logout = function () {
      storage.clear();
      $window.location.href = '/';
    };
  }
]);
app.controller('StreamCtrl', [
  '$scope',
  'soundcloud',
  function ($scope, soundcloud) {
    $scope.page = 0;
    soundcloud.get('/me/activities', function (data) {
      $scope.tracks = data.collection;
      console.log(data);
    });
    $scope.loadMore = function () {
      soundcloud.get($scope.next_href, function (data) {
        $scope.$apply(function () {
          console.log(data);
          $scope.tracks.push(data.collection);
          $scope.next_href = data.next_href;
        });
      });
    };
  }
]);