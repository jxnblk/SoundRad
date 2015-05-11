
'use strict';

app.controller('LikesCtrl', [
  '$scope', '$routeParams', 'soundcloud', 'player',
  function($scope, $routeParams, soundcloud, player) {

  $scope.page = 0;
  soundcloud.params.offset = $scope.page * soundcloud.params.limit;
  $scope.isLoading = true;
  $scope.view.current = 'likes';
  $scope.endpoint = '/users/' + $routeParams.user + '/favorites';

  soundcloud.get('/users/' + $routeParams.user, function(data) {
    $scope.user = data;
    $scope.user.subview = 'Likes';
  });

  soundcloud.get($scope.endpoint, function(data) {
    $scope.tracks = data;
    player.load(data);
    $scope.isLoading = false;
  });

}]);

