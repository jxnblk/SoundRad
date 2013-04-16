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


  //$scope.player = player;
  $scope.viewUser = 'jxnblk';  
  $scope.getType = '/tracks';
  $scope.scget = '/users/' + $scope.viewUser + $scope.getType;
  $scope.pageSize = 32;
  $scope.pageOffset = 0;
  $scope.tracksLoading = true;
  
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
  $scope.playTrack = function(track, i) {
    console.log(i);
    $scope.nextTrackIndex = i + 1;
    
    // This probs won't work twice
    $scope.nextTrack = $scope.tracks[i + 1];
    
    
    $scope.currentTrack = track;
    track.url = track.stream_url + '?client_id=' + soundcloud.clientid;
    //$scope.player.source = track.stream_url + '?client_id=' + soundcloud.clientid;
    console.log('play: ' + track.title);
    player.play(track);
    track.playing = true;
  };

  $scope.pauseTrack = function(track) {
    $scope.currentTrack = null;
    player.pause();
    track.playing = false;
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
  
  
  

