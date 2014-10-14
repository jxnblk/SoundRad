app.controller('MainCtrl',
  ['$scope', '$window', '$location', 'storage', 'soundcloud',
  function($scope, $window, $location, storage, soundcloud) {

  $scope.currentUser = storage.get('currentUser');
  $scope.token = storage.get('token');

  // Get token from URL hash
  if($location.hash()) {
    var token = $location.hash().replace('#','').split('&')[0].split('=')[1];
    if(token) {
      storage.set('token', token);
      $scope.token = token;
      soundcloud.params.oauth_token = token;
      soundcloud.get('/me', function(data) {
        $scope.currentUser = data;
        storage.set('currentUser', data);
        console.log('me', data);
      });
    };
  };

  $scope.connect = soundcloud.connect;

  $scope.logout = function() {
    storage.clear();
    $window.location.href = '/';
  };

}]);

