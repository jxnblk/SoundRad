
'use strict';

app.controller('LikesCtrl', [
  '$scope', '$routeParams', 'soundcloud', 'player',
  function($scope, $routeParams, soundcloud, player) {

  console.log('likes controller', $routeParams);
  $scope.user = {};
  $scope.user.username = $routeParams.user;

  soundcloud.get('/users/' + $routeParams.user, function(data) {
    $scope.user = data;
  });

  soundcloud.get('/users/' + $routeParams.user + '/favorites', function(data) {
    $scope.tracks = data;
    player.load(data);
  });

}]);

