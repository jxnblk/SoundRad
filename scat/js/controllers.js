'use strict';

/* Controllers */

function HomeCtrl($rootScope, $scope, $http) {
  
  $http.get('http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/jxnblk&client_id=' + $rootScope.clientId).
    success(function(apiUrl){
      console.log('apiUrl: ' + apiUrl);
    }).
    error(function(){
      console.log('what the fucking shit');
    });
      
};


// I do not understand how to use this controllers module. Totally different from the tutorial.
/*
angular.module('sndcat.controllers', []).
  controller('HomeCtrl', [function HomeCtrl($scope) {
    // why this doesn't work???
    //$scope.tracks = jxnblkTracks;
  }])
  .controller('SetsCtrl', [function() {

  }])
  .controller('LikesCtrl', [function() {

  }]);
*/
  
  
  

