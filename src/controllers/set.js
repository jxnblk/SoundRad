
'use strict';

app.controller('SetCtrl', ['$scope', '$routeParams', 'soundcloud', 'player', function($scope, $routeParams, soundcloud, player) {

  $scope.page = 0;
  soundcloud.params.offset = $scope.page * soundcloud.params.limit;
  $scope.isLoading = true;
  $scope.isPlaylist = true;

  $scope.endpoint = '/resolve';
  soundcloud.params.url = 'http://soundcloud.com/' + $routeParams.user + '/sets/' + $routeParams.set;
  if ($routeParams.secret) {
    soundcloud.params.url += '/' + $routeParams.secret;
  }

  soundcloud.jsonp($scope.endpoint, function(data) {
    $scope.set = data;
    $scope.user = data.user;
    $scope.tracks = data.tracks;
    $scope.endpoint = '/playlists/' + data.id;
    player.load(data.tracks);
    $scope.isLoading = false;
  });

}]);

