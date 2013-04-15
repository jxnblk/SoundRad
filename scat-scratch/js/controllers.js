'use strict';

// Controllers

function NavCtrl($scope, soundcloud) {
  
};

function HomeCtrl($scope, soundcloud) {

};
 
function TracklistCtrl($scope, soundcloud) {

  $scope.userName = 'jxnblk';
  $scope.getType = '/tracks';
  $scope.scget = '/users/' + $scope.userName + $scope.getType;
  $scope.pageSize = 32;
  $scope.pageOffset = 0;
  $scope.tracksLoading = true;
  

  soundcloud.get($scope);

  // update tracks in view
  $scope.updateTracks = function() {
    $scope.pageOffset = 0;
    $scope.tracksLoading = true;
    console.log($scope.userName + ':' + $scope.getType);
    $scope.scget = '/users/' + $scope.userName + $scope.getType;
    soundcloud.get($scope);
  };
  
  // Pagination
  $scope.showMore = function() {
    $scope.scget = '/users/' + $scope.userName + $scope.getType;
    // fix: Using the select values changes numbers to strings
    console.log($scope.pageOffset);
    $scope.pageOffset = $scope.pageSize + $scope.pageOffset;
    console.log($scope.pageOffset);
    soundcloud.getMore($scope);
  } 

  // SM Player
  $scope.playTrack = function(track) {
    soundcloud.play(track);
    track.playing = true;
  };
  
  $scope.pauseTrack = function(track) {
    soundcloud.pause();
    track.playing = false;
  };
  
  $scope.pauseAll = function() {
    soundcloud.pauseAll();
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
  
  
  

