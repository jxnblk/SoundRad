
'use strict';

app.controller('SetsCtrl', ['$scope', '$routeParams', 'soundcloud', function($scope, $routeParams, soundcloud) {

  $scope.page = 0;
  soundcloud.params.offset = $scope.page * soundcloud.params.limit;
  $scope.isLoading = true;
  $scope.view.current = 'sets';
  $scope.endpoint = '/users/' + $routeParams.user + '/playlists';

  soundcloud.get('/users/' + $routeParams.user, function(data) {
    $scope.user = data;
    $scope.user.subview = 'Playlists';
  });

  soundcloud.get($scope.endpoint, function(data) {
    $scope.tracks = data;
    $scope.isLoading = false;
  });

}]);

