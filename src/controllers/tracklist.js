
'use strict';

app.controller('TracklistCtrl', ['$scope', 'soundcloud', 'player', function($scope, soundcloud, player) {

  $scope.hasNextPage = true;

  $scope.nextPage = function() {
    $scope.isLoading = true;
    if ($scope.isStream) {
      soundcloud.getStreamNextPage(function(data) {
        $scope.tracks = $scope.tracks.concat(data);
        player.tracks = $scope.tracks;
        $scope.isLoading = false;
      });
    } else {
      $scope.page++;
      soundcloud.params.offset = $scope.page * soundcloud.params.limit;
      soundcloud.get($scope.endpoint, function(data) {
        if (!data.length) {
          $scope.hasNextPage = false;
          $scope.isLoading = false;
          return false;
        }
        if ($scope.isPlaylist) {
          $scope.tracks = $scope.tracks.concat(data.tracks);
        } else {
          $scope.tracks = $scope.tracks.concat(data);
        }
        player.tracks = $scope.tracks;
        $scope.isLoading = false;
      });
    }
  };

  $scope.like = function(track) {
    if (!$scope.token) return false;
    console.log('like');
    soundcloud.like(track, function(response) {
      track.user_favorite = true;
    });
  };

  $scope.unlike = function(track) {
    if (!$scope.token) return false;
    console.log('unlike');
    soundcloud.unlike(track, function(response) {
      track.user_favorite = false;
    });
  };

}]);

