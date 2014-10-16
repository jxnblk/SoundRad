
'use strict';

app.controller('UserCtrl', [
  '$scope', '$routeParams', 'soundcloud', 'player',
  function($scope, $routeParams, soundcloud, player) {

  soundcloud.get('/users/' + $routeParams.user, function(data) {
    $scope.user = data;
  });

  soundcloud.get('/users/' + $routeParams.user + '/tracks', function(data) {
    $scope.tracks = data;
    player.load(data);
  });

}]);

