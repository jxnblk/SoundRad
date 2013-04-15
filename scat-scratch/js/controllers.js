'use strict';

// Controllers

function NavCtrl($scope, soundcloud) {
  
};
 
function TracklistCtrl($scope, soundcloud) {

  $scope.userName = 'jxnblk';
  $scope.getType = '/tracks';
  $scope.scget = '/users/' + $scope.userName + $scope.getType;
  $scope.pageSize = 32;
  $scope.pageOffset = 0;
  $scope.tracksLoading = true;
  $scope.sound = null;
  

  soundcloud.get($scope);

  // update tracks in view
  $scope.updateTracks = function() {
    $scope.tracksLoading = true;
    $scope.scget = '/users/' + $scope.userName + $scope.getType;
    soundcloud.get($scope);
  };
  
  // Pagination
  $scope.showMore = function() {
    $scope.pageOffset = $scope.pageSize + $scope.pageOffset;
  } 

  $scope.playTrack = function($scope, track) {
    console.log('clicked play');
    soundcloud.play($scope, track);
    track.playing = true;
  };
  
  $scope.pauseTrack = function($scope) {
    console.log('clicked pause');
    soundcloud.pause($scope);
    track.playing = false;
  };
  
  $scope.checkVar = function(value){
    console.log(value);
  };
  
};

function LikesCtrl($scope, soundcloud) {
  // Should include these in separate controllers for each page
  $scope.getType = '/favorites';
  $scope.scget = '/users/' + $scope.userName + $scope.getType;
  soundcloud.get($scope);
};

function SetsCtrl($scope, soundcloud) {
  // Should include these in separate controllers for each page
  $scope.getType = '/playlists';
  $scope.scget = '/users/' + $scope.userName + $scope.getType;
  soundcloud.get($scope);
};
  
  
  

