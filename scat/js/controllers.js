'use strict';

// Controllers

function NavCtrl($scope, $route, $routeParams, soundcloud, player, audio) {
  
  // Init Defaults
  $scope.$routeParams = $routeParams;
  $scope.player = player;
  $scope.audio = audio;
  
  // Reconnect user
  $scope.token = localStorage.getItem('token');
  // Need better error states here
  if ($scope.token){
    console.log('got local token');
    $scope.connected = true;
    //$scope.token = localStorage['scat.token'];
    $scope.username = localStorage.getItem('username');
    //soundcloud.connect($scope);
    window.SC.storage().setItem('SC.accessToken', $scope.token); 
  };
  
  // Define initial view
  
  
  if($scope.$routeParams.viewUser){
    $scope.viewUser = $scope.$routeParams.viewUser;
    if($scope.$routeParams.getType){
      $scope.getType = '/' + $scope.$routeParams.getType;  
    } else {
      $scope.getType = '/tracks';
    };
    $scope.scget = '/users/' + $scope.viewUser + $scope.getType;
  } else if ($scope.connected) {
    console.log('getting users stream');
    $scope.scget = '/me/activities/tracks/affiliated';
  } else {
    // Default Views - all about me
    $scope.viewUser = 'jxnblk';
    $scope.getType = '/tracks';
    $scope.scget = '/users/' + $scope.viewUser + $scope.getType;
  };
     
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
  
  $scope.connect = function() {
    soundcloud.connect($scope);
  };
  
  // update tracks in view
  $scope.updateTracks = function() {
    $scope.pageOffset = 0;
    $scope.tracksLoading = true;
    // Need to create a more dynamic way of doing this??
    $scope.scget = '/users/' + $scope.viewUser + $scope.getType;
    soundcloud.get($scope);
  };
  
  // Pagination
  $scope.showMore = function() {
    $scope.tracksLoading = true;
    //$scope.scget = '/users/' + $scope.viewUser + $scope.getType;
    console.log($scope.pageOffset);
    $scope.pageOffset = $scope.pageSize + $scope.pageOffset;
    console.log($scope.pageOffset);
    //soundcloud.getMore($scope);

    // this will definitely break other pagination
    /*
if ($scope.streamNextPage) {
      $scope.scget = $scope.streamNextPage;
      soundcloud.get($scope, {add: true});
    } else {
      soundcloud.get($scope, {add: true});
    };
*/
    
    soundcloud.get($scope, {add: true});
    
    
  } 

  // Gimme some data
  soundcloud.get($scope);

  // Jxn Player (Based on Peepcode Tunes)
  $scope.playTrack = function(tracks, i) {
    player.play(tracks, i);
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
    
  // Scrubbers
  
  function updateView() {
    $scope.$apply(function() {
      $scope.currentBufferPercentage = ((audio.buffered.length && audio.buffered.end(0)) / audio.duration) * 100;
      $scope.currentTimePercentage = (audio.currentTime / audio.duration) * 100;
      $scope.currentTimeMS = (audio.currentTime * 1000).toFixed();
      $scope.durationMS = (audio.duration * 1000).toFixed();
    });
  };
  audio.addEventListener('timeupdate', updateView);

  // Seeking
  $scope.seekTo = function($event){
    var xpos = $event.layerX / $event.target.offsetWidth;
    player.seek(xpos * audio.duration);
  };
 
};

function TracklistCtrl($scope, soundcloud) {
  // Figure out what is in scope for tracklist
  // + How to split page scope up 
  
  // Audio and player scope can probably be limited to tracklist
};
  
  
  

