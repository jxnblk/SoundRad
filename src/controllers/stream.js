
'use strict';

app.controller('StreamCtrl', ['$scope', 'soundcloud', 'player', function($scope, soundcloud, player) {

  $scope.page = 0;
  $scope.isLoading = true;

  soundcloud.getStream(function(data) {
    $scope.tracks = data;
    $scope.isLoading = false;
    player.load(data);
  });

  $scope.loadMore = function() {
    $scope.isLoading = true;
    soundcloud.getStreamNextPage(function(data) {
      $scope.tracks = $scope.tracks.concat(data);
      $scope.isLoading = false;
      player.load($scope.tracks);
    });
  };

}]);

