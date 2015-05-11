
'use strict';

app.controller('MainCtrl',
  ['$scope', '$window', '$location', 'storage', 'soundcloud', 'player', 'hotkeys',
  function($scope, $window, $location, storage, soundcloud, player, hotkeys) {

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
        $location.search('');
        $location.hash('');
        $window.location.href = '/';
      });
    };
  };

  $scope.connect = soundcloud.connect;

  $scope.logout = function() {
    storage.clear();
    $window.location.href = '/';
  };

  player.audio.addEventListener('timeupdate', function() {
    $scope.$apply(function() {
      $scope.currentTime = player.audio.currentTime;
    });
  });


  // Keyboard Shortcuts

  hotkeys.add({
    combo: 'space',
    description: 'Play/Pause',
    callback: function(e) {
      e.preventDefault();
      player.playPause();
    }
  });

  hotkeys.add({
    combo: ['right', 'j'],
    description: 'Skip to next track',
    callback: function(e) {
      e.preventDefault();
      player.next();
    }
  });

  hotkeys.add({
    combo: ['left', 'k'],
    description: 'Skip to previous track',
    callback: function(e) {
      e.preventDefault();
      player.previous();
    }
  });

  hotkeys.add({
    combo: 'g s',
    description: 'Go to Stream',
    callback: function(e) {
      e.preventDefault();
      $location.path('/');
    }
  });

  hotkeys.add({
    combo: 'g l',
    description: 'Go to Likes',
    callback: function(e) {
      e.preventDefault();
      if ($scope.currentUser) {
        $location.path('/' + $scope.currentUser.permalink + '/likes');
      }
    }
  });

  hotkeys.add({
    combo: 'g p',
    description: 'Go to Playlists',
    callback: function(e) {
      e.preventDefault();
      if ($scope.currentUser) {
        $location.path('/' + $scope.currentUser.permalink + '/sets');
      }
    }
  });

  hotkeys.add({
    combo: 'g m',
    description: 'Go to My Tracks',
    callback: function(e) {
      e.preventDefault();
      if ($scope.currentUser) {
        $location.path('/' + $scope.currentUser.permalink);
      }
    }
  });


}]);

