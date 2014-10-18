
'use strict';

app.controller('SetsCtrl', ['$scope', '$routeParams', 'soundcloud', function($scope, $routeParams, soundcloud) {

  $scope.isLoading = true;
  $scope.view.current = 'sets';
  //$scope.endpoint = '/users/' + $routeParams.user + '/favorites';

  if ($scope.user.permalink != $routeParams.user) {
    soundcloud.get('/users/' + $routeParams.user, function(data) {
      $scope.user = data;
      $scope.user.subview = 'Playlists';
    });
  } else {
    $scope.user.subview = 'Playlists';
  }

  //soundcloud.get($scope.endpoint, function(data) {
  //  $scope.tracks = data;
  //  player.load(data);
  //  $scope.isLoading = false;
  //});

}]);

