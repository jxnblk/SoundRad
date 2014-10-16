app.controller('StreamCtrl', ['$scope', 'soundcloud', 'player', function($scope, soundcloud, player) {

  $scope.page = 0;
  $scope.isLoading = true;

  soundcloud.getStream(function(data) {
    $scope.tracks = data.collection;
    $scope.isLoading = false;
    player.tracks = $scope.tracks;
  });

  $scope.loadMore = function() {
    $scope.isLoading = true;
    soundcloud.getStreamNextPage(function(data) {
      $scope.tracks = $scope.tracks.concat(data.collection);
      $scope.isLoading = false;
      player.tracks = $scope.tracks;
    });
  };

}]);

