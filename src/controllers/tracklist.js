
'use strict';

app.controller('TracklistCtrl', ['$scope', 'soundcloud', 'player', function($scope, soundcloud, player) {

  $scope.page = 0;

  $scope.nextPage = function() {
    $scope.isLoading = true;
    $scope.page++;
    soundcloud.params.offset = $scope.page * soundcloud.params.limit;
    if ($scope.isStream) {
      soundcloud.getStreamNextPage(function(data) {
        $scope.tracks = $scope.tracks.concat(data);
        player.tracks = $scope.tracks;
        $scope.isLoading = false;
      });
    } else {
      soundcloud.get($scope.endpoint, function(data) {
        $scope.tracks = $scope.tracks.concat(data);
        player.tracks = $scope.tracks;
        $scope.isLoading = false;
      });
    }

  };

}]);

