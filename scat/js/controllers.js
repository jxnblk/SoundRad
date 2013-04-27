'use strict';

// Controllers


angular.module('scat.controllers', [])

  .controller('NavCtrl', ['$scope', '$route', '$routeParams', '$location', 'soundcloud', 'player', function($scope, $route, $routeParams, $location, soundcloud, player) {
    // Get routeparams - probably don't need this if app.js handles routing
    $scope.$routeParams = $routeParams;
    //$scope.connectedUserIndex = localStorage.getItem('connectedUserIndex');
    
    if(localStorage.getItem('username-0')){
      $scope.connectedUsers = new Array(localStorage.getItem('username-0'));
      var i = 1;
      while (localStorage.getItem('username-' + i)){
        $scope.connectedUsers[i] = localStorage.getItem('username-' + i);
        i++;
      };
    } else {
      $scope.connectedUsers = new Array();
    };
    // Sets currently connected user
    $scope.connectedUserIndex = 0;
    
    // Reconnect user
    $scope.token = localStorage.getItem('token-' + $scope.connectedUserIndex);  
    if ($scope.token){
      $scope.connected = true;
      $scope.username = localStorage.getItem('username-' + $scope.connectedUserIndex);      
      soundcloud.connect($scope);
      player.setToken($scope);
    };
       
    $scope.pageSize = 32;
    $scope.pageOffset = 0;
    $scope.tracksLoading = true;
    
    $scope.connect = function() {
      soundcloud.connect($scope);
      player.setToken($scope);
      // too soon, can't do it here
      //$location.path('/stream');
    };
    
    $scope.addConnectedUser = function() {
      $scope.connectedUserIndex = $scope.connectedUserIndex + 1;
      //$scope.connected = false;
      soundcloud.connect($scope);
      player.setToken($scope);
    };
    
    $scope.switchUser = function($index) {
      $scope.username = localStorage.getItem('username-' + $index);
      $scope.token = localStorage.getItem('token-' + $index);
      window.SC.storage().setItem('SC.accessToken', $scope.token); 
      $location.path('/');
      player.setToken($scope);
    };
    
    $scope.current = player.current;

  }])
  
  .controller('HomeCtrl', ['$scope', 'soundcloud', function($scope, soundcloud) {

  }])

  .controller('UserCtrl', ['$scope', 'soundcloud', function($scope, soundcloud) {    
    // Setting scget to user views  
    $scope.viewUser = $scope.$routeParams.viewUser;
    $scope.scget = '/users/' + $scope.viewUser + $scope.getType;
    
    // Pagination
    $scope.showMore = function() {
      $scope.tracksLoading = true;
      $scope.pageOffset = $scope.pageSize + $scope.pageOffset;
      soundcloud.get($scope, {add: true});  
    }; 
    
    soundcloud.get($scope);
    soundcloud.getUser($scope);

  }])
  
  .controller('StreamCtrl', ['$scope', 'soundcloud', function($scope, soundcloud) {
    $scope.scget = '/me/activities/tracks';
    
    // Pagination for stream view
    $scope.showMore = function() {
      $scope.tracksLoading = true;
      if ($scope.streamNextPage) {
        $scope.scget = $scope.streamNextPage;
        soundcloud.get($scope, {add: true, stream: true});
      } else {
        soundcloud.get($scope, {add: true, stream: true});
      };   
      soundcloud.get($scope, {add: true, stream: true});
    }; 

    soundcloud.get($scope, {stream: true});
  }])
  
  .controller('UserTracksCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){
    //console.log('UserTracksCtrl');
    $scope.getType = '/tracks';
  }])
  
  .controller('SetsCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){
    //console.log('SetsCtrl');
    $scope.pageSize = 4;
    $scope.getType = '/playlists';
  }])
  
  .controller('LikesCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){
    //console.log('LikesCtrl');
    $scope.getType = '/favorites';
  }])
  
  .controller('FollowingCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){  
    $scope.viewUser = $scope.$routeParams.viewUser;
    soundcloud.getFollowings($scope, $scope.viewUser);
    
    $scope.sorts = [
      { json: 'followers_count', human: 'Popularity', reverse: true },
      { json: 'username', human: 'Alphabetical', reverse: false }
    ];
    
    $scope.sortFollowings = $scope.sorts[0];
    
  }])
  
  .controller('TrackDetailCtrl', ['$scope', 'soundcloud', 'player', function($scope, soundcloud, player){
    $scope.viewUser = $scope.$routeParams.viewUser;
    $scope.trackUrl = $scope.$routeParams.track;
    $scope.urlPath = '/' + $scope.viewUser + '/' + $scope.trackUrl;
    $scope.pageOffset = 1; // hiding pagination from tracklist partial
    soundcloud.getTrack($scope);
    //$scope.tracks = $scope.resolveData    

    //$scope.scget = '/users/' + $scope.viewUser + '/tracks/' + $scope.trackUrl;
    //soundcloud.get($scope, {track: true});
    
  }])
  
  .controller('TracklistCtrl', ['$scope', 'soundcloud', 'player', 'audio', function($scope, soundcloud, player, audio) {
      
  }])
  
  .controller('PlayerCtrl', ['$scope', 'soundcloud', 'player', 'audio', function($scope, soundcloud, player, audio) {
    //console.log('PlayerCtrl');
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
    
    // Loop
    $scope.toggleLoop = function(track){
      console.log('toggle loop');
      if (!track.loop) {
        track.loop = true;  
      } else {
        track.loop = false;
      };
    };
    

  }])
  
  .controller('TrackCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){
    //if ($scope.connected) {
      $scope.liked = $scope.track.user_favorite;
      $scope.like = function(trackid) {
        console.log('like ' + trackid);
        soundcloud.like($scope, trackid);
      };
      $scope.unlike = function(trackid) {
        console.log('unlike ' + trackid);
        soundcloud.unlike($scope, trackid);
      };
    //}; // Else conditions for non-connected users
  }]);
  
  
  

