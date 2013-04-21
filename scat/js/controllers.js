'use strict';

// Controllers

function NavCtrl($scope, $route, $routeParams, $location, soundcloud) {
  console.log('NavCtrl');
  // Get routeparams - probably don't need this if app.js handles routing
  $scope.$routeParams = $routeParams;
  
  // Reconnect user
  $scope.token = localStorage.getItem('token');
  // Need better error states here
  if ($scope.token){
    $scope.connected = true;
    //$scope.token = localStorage['scat.token'];
    $scope.username = localStorage.getItem('username');
    //soundcloud.connect($scope);
    
    // Should probably do this in factory
    window.SC.storage().setItem('SC.accessToken', $scope.token); 
    soundcloud.token = $scope.token;
  };
  
  // Define initial view - should move this to home controller
  if ($scope.connected) {
    $location.path('/stream');
    $scope.home = '/stream';
  } else {
    $location.path('/jxnblk');
    $scope.home = '/jxnblk';
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
    $scope.home = '/stream';
  };

};

function UserCtrl($scope, soundcloud){
  console.log('UserCtrl');
  
  // Setting scget to user views
  if($scope.$routeParams.viewUser){
    $scope.viewUser = $scope.$routeParams.viewUser;
    if($scope.$routeParams.getType){
      $scope.getType = '/' + $scope.$routeParams.getType;  
    } else {
      $scope.getType = '/tracks';
    };
    $scope.scget = '/users/' + $scope.viewUser + $scope.getType;
  };
  
  // Pagination
  $scope.showMore = function() {
    $scope.tracksLoading = true;
    $scope.pageOffset = $scope.pageSize + $scope.pageOffset;
    soundcloud.get($scope, {add: true});  
  }; 
  
  // Gimme some track data
  soundcloud.get($scope);
  
};

function StreamCtrl($scope, soundcloud) {
  console.log('StreamCtrl');
  
  // Set scget to stream
  $scope.scget = '/me/activities/tracks';
  
  // Pagination
  $scope.showMore = function() {
    $scope.tracksLoading = true;
    // Pagination for stream view
    if ($scope.streamNextPage) {
      $scope.scget = $scope.streamNextPage;
      soundcloud.get($scope, {add: true, stream: true});
    } else {
      soundcloud.get($scope, {add: true, stream: true});
    };   
    soundcloud.get($scope, {add: true, stream: true});
  }; 
  
  // Gimme some stream data
  console.log('getting stream data');
  soundcloud.get($scope, {stream: true});
  
  
};

function TracklistCtrl($scope, soundcloud, player, audio) {
  console.log('TracklistCtrl');
  $scope.player = player;
  $scope.audio = audio;
  
  // Jxn Player (Based on Peepcode Tunes)
  $scope.playTrack = function(tracks, i) {
    player.play(tracks, i);
  };

  $scope.pauseTrack = function(track) {
    player.pause(track);
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
  
  
  

