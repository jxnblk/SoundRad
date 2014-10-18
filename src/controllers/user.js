
'use strict';

app.controller('UserCtrl', [
  '$scope', '$routeParams', 'soundcloud', 'player',
  function($scope, $routeParams, soundcloud, player) {

  //$scope.user = $routeParams.user;
  if ($routeParams.user == $scope.currentUser.permalink) {
    $scope.view.current = 'me';
  } else {
    $scope.view.current = 'user';
  }
  $scope.endpoint = '/users/' + $routeParams.user + '/tracks';

  soundcloud.get('/users/' + $routeParams.user, function(data) {
    $scope.user = data;
  });

  soundcloud.get($scope.endpoint, function(data) {
    $scope.tracks = data;
    player.load(data);
  });

}]);

