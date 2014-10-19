
'use strict';

app.controller('MainCtrl',
  ['$scope', '$window', '$location', '$route', 'storage', 'soundcloud', 'player',
  function($scope, $window, $location, $route, storage, soundcloud, player) {

  $scope.currentUser = storage.get('currentUser');
  $scope.token = storage.get('token');
  $scope.player = player;
  $scope.audio = player.audio;
  $scope.view = { current: null };
  $scope.user = {};
  $scope.user.username = '';
  $scope.errors = [];

  // Get token from URL hash
  if($location.hash()) {
    var token = $location.hash().replace('#','').split('&')[0].split('=')[1];
    if(token) {
      storage.set('token', token);
      $scope.token = token;
      soundcloud.params.oauth_token = token;
      soundcloud.get('/me', function(data) {
        $scope.currentUser = data;
        storage.set('currentUser', data);
      });
      $location.search('');
      $location.hash('');
      $route.reload();
    };
  };

  $scope.connect = soundcloud.connect;

  $scope.logout = function() {
    storage.clear();
    //$window.location.href = '/';
    $route.reload();
  };

  player.audio.addEventListener('timeupdate', function() {
    $scope.$apply(function() {
      $scope.currentTime = player.audio.currentTime;
    });
  });

}]);

