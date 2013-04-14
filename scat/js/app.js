'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('sndcat', ['sndcat.services', 'sndcat.controllers']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/likes', {templateUrl: 'partials/likes.html', controller: 'LikesCtrl'});
    $routeProvider.when('/sets', {templateUrl: 'partials/sets.html', controller: 'SetsCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);

  app.run(function($rootScope, $http) {
    // SC API Init
    $rootScope.clientId = '66828e9e2042e682190d1fde4b02e265';
    SC.initialize({
      client_id: '66828e9e2042e682190d1fde4b02e265',
      redirect_uri: 'http://jxnblk.com/scat'
    });
    $rootScope.scAccessToken = localStorage['sc-access-token'];
    $rootScope.userName = 'mrsjxn';
    console.log('accesstoken: ' + $rootScope.scAccessToken);
    if ($rootScope.scAccessToken) {
      $http.get('https://api.soundcloud.com/me.json?oauth_token=' + $rootScope.scAccessToken).
        success(function(me) {
          console.log('got me');
          $rootScope.userName = me.username;
        });
    console.log($rootScope.userName);
    };

    $rootScope.connect = function(){
      console.log('clicked connect');
      $rootScope.userName = 'trying to connect...';
      SC.connect(function(){
        SC.get('/me', function(me){
          $rootScope.userName = me.username;
          console.log($rootScope.userName);
        });
        var $scAccessToken = SC.accessToken();
        console.log($scAccessToken);
        localStorage['sc-access-token'] = $scAccessToken;
      });
    };
  });
  
