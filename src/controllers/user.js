
'use strict';

app.controller('UserCtrl', [
  '$scope', '$routeParams', 'soundcloud', 'player',
  function($scope, $routeParams, soundcloud, player) {

  $scope.user = $routeParams.user;
  $scope.endpoint = '/users/' + $routeParams.user + '/tracks';

  soundcloud.get($scope.endpoint, function(data) {
    $scope.tracks = data;
    player.load(data);
  });

}]);

