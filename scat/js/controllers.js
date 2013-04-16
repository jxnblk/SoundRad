'use strict';

// Controllers

function NavCtrl($scope, $routeParams, soundcloud, player) {

  //console.log($routeParams);
  
  // Init Defaults
  /*
if ($routeParams.viewUser){
    $scope.viewUser = $routeParams.viewUser
  } else {
    $scope.viewUser = 'jxnblk';
  }
*/

/*
  NavCtrl = function($scope, $http, player) {
    $scope.player = player;
    $http.get('albums.json').success(function(data) {
      $scope.albums = data;
    });
  };
*/


  $scope.player = player;
  $scope.viewUser = 'jxnblk';  
  $scope.getType = '/tracks';
  $scope.scget = '/users/' + $scope.viewUser + $scope.getType;
  $scope.pageSize = 32;
  $scope.pageOffset = 0;
  $scope.tracksLoading = true;
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

  // Something else goes here, fur sure
  
  // update tracks in view
  $scope.updateTracks = function() {
    $scope.pageOffset = 0;
    $scope.tracksLoading = true;
    console.log($scope.viewUser + ':' + $scope.getType);
    $scope.scget = '/users/' + $scope.viewUser + $scope.getType;
    soundcloud.get($scope);
  };
  
  // Pagination
  $scope.showMore = function() {
    $scope.scget = '/users/' + $scope.viewUser + $scope.getType;
    // fix: Using the select values changes numbers to strings
    console.log($scope.pageOffset);
    $scope.pageOffset = $scope.pageSize + $scope.pageOffset;
    console.log($scope.pageOffset);
    soundcloud.getMore($scope);
  } 

  // Get some data motherfucker
  soundcloud.get($scope);

  // Jxn Player (Based on Peepcode Tunes)
  $scope.playTrack = function(tracks, i) {
    console.log('play: ' + tracks[i].title);
    player.play(tracks, i);
    // For displaying only
    $scope.currentTrack = player.current.track;
  };

  $scope.pauseTrack = function(track) {
    player.pause();
  };
  
  $scope.playNextTrack = function(tracks, i) {
    console.log('play next track' + tracks[i]);
    player.next();
  };
  
  
 
};

function TracklistCtrl($scope, soundcloud) {
  // Figure out what is in scope for tracklist
  // + How to split page scope up 
};

function LikesCtrl($scope, soundcloud) {
  // Should include these in separate controllers for each page
  $scope.getType = '/favorites';
  $scope.scget = '/users/' + $scope.viewUser + $scope.getType;
  soundcloud.get($scope);
};

function SetsCtrl($scope, soundcloud) {
  // Should include these in separate controllers for each page
  $scope.getType = '/playlists';
  $scope.scget = '/users/' + $scope.viewUser + $scope.getType;
  soundcloud.get($scope);
};
  
  
  

