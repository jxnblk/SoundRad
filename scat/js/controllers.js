'use strict';

// Controllers


angular.module('scat.controllers', [])

  .controller('NavCtrl', ['$scope', '$route', '$routeParams', '$location', 'soundcloud', function($scope, $route, $routeParams, $location, soundcloud) {
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
    
    // Define initial view - should move this to home controller & handle with routeparams - yes
    if ($scope.connected) {
      $scope.home = '/stream';
    } else {
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
      $scope.tokenUrl = $location.path();
      console.log($scope.tokenUrl);
    };

  }])

  .controller('UserCtrl', ['$scope', 'soundcloud', function($scope, soundcloud) {
    console.log('UserCtrl');
    
    // Setting scget to user views  
    $scope.viewUser = $scope.$routeParams.viewUser;
    $scope.scget = '/users/' + $scope.viewUser + $scope.getType;
    
    
    // Pagination
    $scope.showMore = function() {
      $scope.tracksLoading = true;
      $scope.pageOffset = $scope.pageSize + $scope.pageOffset;
      soundcloud.get($scope, {add: true});  
    }; 
    
    // Gimme some track data
    soundcloud.get($scope);
    
    // Get user data
    soundcloud.getUser($scope);

  }])
  
  .controller('StreamCtrl', ['$scope', 'soundcloud', function($scope, soundcloud) {
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

  }])
  
  .controller('UserTracksCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){
    console.log('UserTracksCtrl');
    $scope.getType = '/tracks';
  }])
  
  .controller('SetsCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){
    console.log('SetsCtrl');
    $scope.pageSize = 4;
    $scope.getType = '/playlists';
  }])
  
  .controller('LikesCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){
    console.log('LikesCtrl');
    $scope.getType = '/favorites';
  }])
  
  .controller('TrackDetailCtrl', ['$scope', 'soundcloud', 'player', function($scope, soundcloud, player){
    console.log('TrackDetailCtrl');
    //console.log($routeParams.track);
    $scope.viewUser = $scope.$routeParams.viewUser;
    $scope.trackUrl = $scope.$routeParams.track;
    $scope.scget = '/tracks/' + $scope.trackUrl;
    
    $scope.playTrack = function(track) {
      player.play(track);
    };
    
    soundcloud.get($scope, {track: true});
    if ($scope.connected) {
      
      
    };
    
  }])
  
  .controller('TracklistCtrl', ['$scope', 'soundcloud', 'player', 'audio', function($scope, soundcloud, player, audio) {
      
  }])
  
  .controller('TrackCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){
  
    if ($scope.connected) {
      // Init liked from track object
      $scope.liked = $scope.track.user_favorite;
      
      $scope.like = function(trackid) {
        soundcloud.like($scope, trackid);
      };
      
      $scope.unlike = function(trackid) {
        soundcloud.unlike($scope, trackid);
      };
      
    };
  }])
  
  .controller('PlayerCtrl', ['$scope', 'soundcloud', 'player', 'audio', function($scope, soundcloud, player, audio) {
    console.log('PlayerCtrl');
    $scope.player = player;
    $scope.audio = audio;
    $scope.viewActions = false;
    
    // Jxn Player (Based on Peepcode Tunes)
    $scope.playTracks = function(tracks, i) {
      player.play(tracks, i);
    };
    
    $scope.playTrack = function(track) {
      player.playSingle(track);
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
      var xpos = $event.offsetX / $event.target.offsetWidth;
      player.seek(xpos * audio.duration);
    };
    
    // Track Actions
    $scope.showActions = function(){
      $scope.viewActions = true;
    };
    
    
    
    
  }]);
  
  
  

