'use strict';

// Controllers


angular.module('scat.controllers', [])

  .controller('NavCtrl', ['$scope', '$route', '$routeParams', '$location', '$window', 'soundcloud', 'player', function($scope, $route, $routeParams, $location, $window, soundcloud, player) {
    
    $scope.$routeParams = $routeParams;
    
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
      soundcloud.getMe($scope);
    };
    
//// Figure out getMe - where is this being used and is it necessary?    
    
    $scope.connect = function() {
      soundcloud.connect($scope);
      player.setToken($scope);
    };
    
    $scope.addConnectedUser = function() {
      $scope.connectedUserIndex = $scope.connectedUserIndex + 1;
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
    
       
    $scope.pageSize = 32;
    $scope.pageOffset = 0;
    $scope.tracksLoading = true;
      
    $scope.current = player.current;
    
    // Loop
    $scope.toggleLoop = function(track){
      console.log('toggle loop');
      if (!track.loop) {
        track.loop = true;  
      } else {
        track.loop = false;
      };
    };
    
        
    // Window Size
    $scope.updateWidth = function() {
      $scope.width = $window.innerWidth;
      if ($scope.width > 640){
        $scope.layout = 'desktop';
      } else {
        $scope.layout = 'mobile';
      }
    };
    $scope.updateWidth();
    $window.onresize = function () {
      $scope.updateWidth();
      $scope.$apply();
    }
    
  }])
  
  .controller('StreamCtrl', ['$scope', 'soundcloud', function($scope, soundcloud) {
    $scope.scget = '/me/activities/tracks';
    // Pagination for stream view
    $scope.showMore = function() {
      $scope.tracksLoading = true;
      if ($scope.streamNextPage) {
        $scope.scget = $scope.streamNextPage;
        soundcloud.getStream($scope, {add: true});
      } else {
        console.log('why is stream being added without nextpage link?');
        //soundcloud.addTracks($scope);
      };   
    }; 
    soundcloud.getStream($scope);
  }])

  .controller('UserCtrl', ['$scope', 'soundcloud', function($scope, soundcloud) {    

    /* // maybe try this for getuser
    var lastRoute = $route.current;
    if ($route.current.$route.templateUrl.indexOf('mycurrentpath') > 0) {
        $route.current = lastRoute;         
    }
    */
  
    $scope.viewUser = $scope.$routeParams.viewUser;
    $scope.viewUsername = $scope.viewUser;
    $scope.scget = '/users/' + $scope.viewUser + $scope.getType;
        
    // Pagination
    $scope.showMore = function() {
      $scope.tracksLoading = true;
      $scope.pageOffset = $scope.pageSize + $scope.pageOffset;
      soundcloud.addTracks($scope);  
    }; 
    
    if ($scope.contentType == 'tracks'){
      soundcloud.getTracks($scope);  
    };
    
    // Need to figure out how not to call this every time the routeparams change
    soundcloud.getUser($scope);
    
  }])
  
  .controller('UserTracksCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){
    $scope.contentType = 'tracks';
    $scope.getType = '/tracks';
  }])
  
  .controller('SetsCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){
    $scope.contentType = 'tracks';
    $scope.getType = '/playlists';
  }])
  
  .controller('LikesCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){
    $scope.contentType = 'tracks';
    $scope.getType = '/favorites';
  }])
  
  .controller('FollowingCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){  
    $scope.contentType = 'users';
    $scope.viewUser = $scope.$routeParams.viewUser;
    $scope.tracksLoading = true;
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
  }])
  
  .controller('SetCtrl', ['$scope', 'soundcloud', 'player', function($scope, soundcloud, player){
    $scope.viewUser = $scope.$routeParams.viewUser;
    $scope.setUrl = $scope.$routeParams.set;
    $scope.urlPath = '/' + $scope.viewUser + '/sets/' + $scope.setUrl;
    //$scope.pageOffset = 1; // hiding pagination from tracklist partial
    soundcloud.getTrack($scope);    
  }])
  
  .controller('ActivitiesCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){
    $scope.tracksLoading = true;
    $scope.scget = '/me/activities';
    soundcloud.getActivities($scope);
    
    $scope.showMore = function() {
      $scope.tracksLoading = true;
      $scope.pageOffset = $scope.pageSize + $scope.pageOffset;
      soundcloud.getActivities($scope, {add: true});  
    };
    
  }])
 
  .controller('PlayerCtrl', ['$scope', 'soundcloud', 'player', 'audio', '$location', function($scope, soundcloud, player, audio, $location) {
    //console.log('PlayerCtrl');
    // Do I need these?
    $scope.player = player;
    $scope.audio = audio;
    
    // Jxn Player (Based on Peepcode Tunes)
    $scope.playTracks = function(tracks, i) {
      player.play(tracks, i);
      $scope.current.URL = $location.path();
    };
  
    $scope.pauseTrack = function(track) {
      player.pause(track);
    };
    
                /* // Could use this for global player
                $scope.playNextTrack = function() { player.next(); };
                $scope.playPreviousTrack = function() { player.previous(); };
                */
    
    $scope.isPlaying = function(track){
        if (track && player.current.title == track.title){
          return true;
        } else {
          return false;
        };
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

  }])
  

  .controller('TrackCtrl', ['$scope', 'soundcloud', 'player', 'audio', function($scope, soundcloud, player, audio){
    //if ($scope.connected) {
    
      //$scope.liked = $scope.track.user_favorite;
      $scope.like = function(trackid) {
        if($scope.connected){
          console.log('like ' + trackid);
          soundcloud.like($scope, trackid);  
        } else {
          $scope.connect();
        };
      };
      $scope.unlike = function(trackid) {
        console.log('unlike ' + trackid);
        soundcloud.unlike($scope, trackid);
      };
    //}; // Else conditions for non-connected users
  }]);
  
  
////////////////////////////////  
  /*
  .controller('GlobalPlayerCtrl', ['$scope', 'player', 'audio', function($scope, player, audio){
    
  }])
  */
  
  /*
  .controller('TracklistCtrl', ['$scope', 'soundcloud', 'player', 'audio', function($scope, soundcloud, player, audio) {
    
  }])
  */
  
  
  

