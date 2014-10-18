
'use strict';

app.controller('LikesCtrl', [
  '$scope', '$routeParams', 'soundcloud', 'player',
  function($scope, $routeParams, soundcloud, player) {

  $scope.isLoading = true;
  $scope.view.current = 'likes';
  $scope.endpoint = '/users/' + $routeParams.user + '/favorites';

  console.log($scope.user);
  if ($scope.user.permalink != $routeParams.user) {
    console.log('get user');
    soundcloud.get('/users/' + $routeParams.user, function(data) {
      $scope.user = data;
      $scope.user.subview = 'Likes';
    });
  } else {
    $scope.user.subview = 'Likes';
  }

  soundcloud.get($scope.endpoint, function(data) {
    $scope.tracks = data;
    player.load(data);
    $scope.isLoading = false;
  });

}]);

