'use strict';

// Controllers

function NavCtrl($scope, $route, $routeParams, soundcloud, player) {
  
  // Init Defaults
  $scope.$routeParams = $routeParams;
  $scope.player = player;
  if($scope.$routeParams.viewUser){
    $scope.viewUser = $scope.$routeParams.viewUser;  
  } else {
    $scope.viewUser = 'jxnblk';
  }
  if($scope.$routeParams.getType){
    $scope.getType = '/' + $scope.$routeParams.getType;  
  } else {
    $scope.getType = '/tracks';
  }
  $scope.scget = '/users/' + $scope.viewUser + $scope.getType;
  $scope.pageSize = 32;
  $scope.pageOffset = 0;
  $scope.tracksLoading = true;
  $scope.currentTime = player.currentTime;
  //$scope.currentTrack = player.current.track;
  
  // Toggle Dev Nav - look into toggle function & make this reusable
  $scope.dropmenuOpen = false;
  $scope.toggleDropmenu = function(){
    if (!$scope.dropmenuOpen){
      $scope.dropmenuOpen = true;
    } else {
      $scope.dropmenuOpen = false;
    };
  };
  
  // update tracks in view
  $scope.updateTracks = function() {
    $scope.pageOffset = 0;
    $scope.tracksLoading = true;
    $scope.scget = '/users/' + $scope.viewUser + $scope.getType;
    soundcloud.get($scope);
  };
  
  // Pagination
  $scope.showMore = function() {
    $scope.tracksLoading = true;
    $scope.scget = '/users/' + $scope.viewUser + $scope.getType;
    $scope.pageOffset = $scope.pageSize + $scope.pageOffset;
    soundcloud.getMore($scope);
  } 

  // Gimme some data
  soundcloud.get($scope);

  // Jxn Player (Based on Peepcode Tunes)
  $scope.playTrack = function(tracks, i) {
    player.play(tracks, i);

    // For displaying only
    $scope.currentTrack = player.current.track;
  };

  $scope.pauseTrack = function(track) {
    player.pause();
  };
  
  $scope.playNextTrack = function() {
    player.next();
  };
  
  $scope.playPreviousTrack = function() {
    player.previous();
  };
  
  
 
};

function TracklistCtrl($scope, soundcloud) {
  // Figure out what is in scope for tracklist
  // + How to split page scope up 
};
  
  
  

