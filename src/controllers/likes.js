
'use strict';

app.controller('LikesCtrl', [
  '$scope', '$routeParams', 'soundcloud', 'player',
  function($scope, $routeParams, soundcloud, player) {

  console.log('likes controller', $routeParams);
  $scope.user = $routeParams.user;
  $scope.isLoading = true;
  $scope.endpoint = '/users/' + $routeParams.user + '/favorites';

  soundcloud.get($scope.endpoint, function(data) {
    $scope.tracks = data;
    player.load(data);
    $scope.isLoading = false;
  });

}]);

