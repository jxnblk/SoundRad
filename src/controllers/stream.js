app.controller('StreamCtrl', ['$scope', 'soundcloud', function($scope, soundcloud) {

  $scope.page = 0;

  soundcloud.get('/me/activities', function(data) {
    $scope.tracks = data.collection;
    console.log(data);
  });

  $scope.loadMore = function() {
    soundcloud.get($scope.next_href, function(data) {
      $scope.$apply(function() {
        console.log(data);
        $scope.tracks.push(data.collection);
        $scope.next_href = data.next_href;
      });
    });
  };

}]);

