
'use strict';

app.controller('SetsCtrl', ['$scope', '$routeParams', 'soundcloud', function($scope, $routeParams, soundcloud) {

  $scope.page = 0;
  soundcloud.params.offset = $scope.page * soundcloud.params.limit;
  $scope.isLoading = true;
  $scope.view.current = 'sets';
  $scope.endpoint = '/users/' + $routeParams.user + '/playlists';

  soundcloud.get($scope.endpoint, function(data) {
    $scope.tracks = data;
    $scope.user = data[0].user;
    $scope.user.subview = 'Playlists';
    $scope.isLoading = false;
  });

}]);

