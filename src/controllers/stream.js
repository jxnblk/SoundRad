app.controller('StreamCtrl', ['$scope', 'soundcloud', function($scope, soundcloud) {

  $scope.page = 0;

  //soundcloud.get('/stream', function(data) {
  soundcloud.get('/users/jxnblk', function(data) {
    //console.log(data);
  });

  $scope.loadMore = function() {
    soundcloud.get($scope.next_href, function(data) {
      $scope.$apply(function() {
        $scope.tracks.push(data.collection);
        $scope.next_href = data.next_href;
      });
    });
  };

}]);

