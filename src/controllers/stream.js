app.controller('StreamCtrl', ['$scope', 'soundcloud', function($scope, soundcloud) {

  $scope.page = 0;
  $scope.isLoading = true;

  soundcloud.getStream(function(data) {
    $scope.tracks = data.collection;
    $scope.isLoading = false;
  });

  $scope.loadMore = function() {
    $scope.isLoading = true;
    soundcloud.getStreamNextPage(function(data) {
      $scope.tracks = $scope.tracks.concat(data.collection);
      $scope.isLoading = false;
    });
  };

}]);

