'use strict';

/* Controllers */

/*
function HomeCtrl($scope) {


  // this works
  $scope.tracks = 'derp';
};
*/


// I do not understand how to use this controllers module. Totally different from the tutorial.
angular.module('sndcat.controllers', []).
  controller('HomeCtrl', [function HomeCtrl($scope) {
    // this doesn't work
    //$scope.tracks = 'derp';
  }])
  .controller('SetsCtrl', [function() {

  }])
  .controller('LikesCtrl', [function() {

  }]);
  
  
  

