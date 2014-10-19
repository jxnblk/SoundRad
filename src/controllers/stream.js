
'use strict';

app.controller('StreamCtrl', ['$scope', 'soundcloud', 'player', function($scope, soundcloud, player) {

  $scope.isLoading = true;
  $scope.isStream = true;
  $scope.view.current = 'stream';

  if ($scope.currentUser) {
    soundcloud.getStream(function(data) {
      $scope.tracks = data;
      $scope.isLoading = false;
      player.load(data);
    });
  }

}]);

