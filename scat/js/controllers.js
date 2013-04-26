'use strict';

// Controllers


angular.module('scat.controllers', [])

  .controller('NavCtrl', ['$scope', '$route', '$routeParams', '$location', 'soundcloud', 'player', function($scope, $route, $routeParams, $location, soundcloud, player) {
    console.log('NavCtrl');
    // Get routeparams - probably don't need this if app.js handles routing
    $scope.$routeParams = $routeParams;
    $scope.connectedUserIndex = localStorage.getItem('connectedUserIndex');
    if(!$scope.connectedUserIndex) {
      $scope.connectedUserIndex = 0;
      $scope.connectedUsers = new Array();
      localStorage.setItem('connectedUserIndex', $scope.connectedUserIndex);
    } else {
      $scope.connectedUserIndex = localStorage.getItem('connectedUserIndex');
      $scope.connectedUsers = new Array(localStorage.getItem('username-0'));
      var i = 1;
      while (localStorage.getItem('username-' + i)){
        $scope.connectedUsers[i] = localStorage.getItem('username-' + i);
        i++;
      };
    };
    
    // Reconnect user
    //$scope.token = localStorage.getItem('token');
    $scope.token = localStorage.getItem('token-' + $scope.connectedUserIndex);  
    // Need better error states here
    if ($scope.token){
      $scope.connected = true;
      $scope.home = '/stream';
      //$location.path('/stream');
      $scope.username = localStorage.getItem('username-' + $scope.connectedUserIndex);      
      // Should probably do this in factory
      window.SC.storage().setItem('SC.accessToken', $scope.token); 
      soundcloud.token = $scope.token;
    };
       
    $scope.pageSize = 32;
    $scope.pageOffset = 0;
    $scope.tracksLoading = true;
    
    $scope.connect = function() {
      soundcloud.connect($scope);
      $scope.home = '/stream';
    };
    
    $scope.addConnectedUser = function() {
      $scope.connectedUserIndex = $scope.connectedUserIndex + 1;
      console.log('user index: ' + $scope.connectedUserIndex);
      //$scope.connected = false;
      //window.SC.storage().setItem('SC.accessToken', null); 
      soundcloud.connect($scope);
    };
    
    $scope.switchUser = function($index) {
      $scope.username = localStorage.getItem('username-' + $index);
      $scope.token = localStorage.getItem('token-' + $index);
      localStorage.setItem('connectedUserIndex', $index);
      $location.path('/stream');
    };
    
    $scope.current = player.current;
    //$scope.currentTrackURL = null;

  }])
  
  .controller('HomeCtrl', ['$scope', 'soundcloud', function($scope, soundcloud) {
    console.log('HomeCtrl');
    
    // should probs handle this with redirects??
    // Setting scget to home views
    if ($scope.connected) {
      $scope.scget = '/me/activities/tracks';
      soundcloud.get($scope, {stream: true});
    } else {
      // Get all tracks
      $scope.scget = '/tracks';
      soundcloud.get($scope);
    };

    // Pagination - need to move this elsewhere / combine with stream pagination?
    $scope.showMore = function() {
      $scope.tracksLoading = true;
      $scope.pageOffset = $scope.pageSize + $scope.pageOffset;
      soundcloud.get($scope, {add: true});  
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
  
  .controller('FollowingCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){  
    // Let's not do this on initial load
    $scope.viewUser = $scope.$routeParams.viewUser;
    console.log('FollowingCtrl');
    soundcloud.getFollowings($scope, $scope.viewUser);
    
    // Need to account for expiration?? or compare to sc.get data before replacing??
    //$scope.followings = JSON.parse(localStorage.getItem($scope.viewUser + '-followings'));
    //if ($scope.followings != null){
      //console.log('got it from localstorage, ma!');
      //soundcloud.getFollowings($scope, $scope.viewUser);
    //} else {
      //soundcloud.getFollowings($scope, $scope.viewUser);
    //};
      
  }])
  
  .controller('TrackDetailCtrl', ['$scope', 'soundcloud', 'player', function($scope, soundcloud, player){
    console.log('TrackDetailCtrl');
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
    
    // For testing Track Detail view
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
    
    // Loop
    $scope.toggleLoop = function(track){
      if (!track.loop) {
        track.loop = true;  
      } else {
        track.loop = false;
      };
    };
    
    
    
    
  }]);
  
  
  

