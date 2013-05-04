'use strict';

// Controllers


angular.module('scat.controllers', [])

  .controller('GlobalCtrl', ['$scope', '$routeParams', '$window', function($scope, $routeParams, $window){
    
    $scope.$routeParams = $routeParams;
    
    $scope.pageSize = 32;
    $scope.pageOffset = 0;
    $scope.tracksLoading = true;
    
    // Window Size - probs should be a different scope
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

  .controller('NavCtrl', ['$scope', '$route', '$routeParams', '$location', 'soundcloud', 'player', function($scope, $route, $routeParams, $location, soundcloud, player) {
    
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
    
  }])
  
  .controller('StreamCtrl', ['$scope', 'soundcloud', function($scope, soundcloud) {
    $scope.scget = '/me/activities/tracks';
    // Pagination for stream view
    $scope.showMore = function() {
      $scope.tracksLoading = true;
      if ($scope.streamNextPage) {
        $scope.scget = $scope.streamNextPage;
        soundcloud.getStream($scope, {add: true});
      };   
    }; 
    soundcloud.getStream($scope);
  }])


  .controller('UserCtrl', ['$scope', 'soundcloud', function($scope, soundcloud) {    

    $scope.viewUser = $scope.$routeParams.viewUser;
    $scope.viewType = $scope.$routeParams.type;
    $scope.viewDetail = $scope.$routeParams.detail;
    
    
      soundcloud.getUser($scope);
    
    //$scope.viewUsername = $scope.viewUser;
    //$scope.scget = '/users/' + $scope.viewUser + $scope.getType;
        
    // Pagination
    $scope.showMore = function() {
      $scope.tracksLoading = true;
      $scope.pageOffset = $scope.pageSize + $scope.pageOffset;
      soundcloud.addTracks($scope);  
    }; 
    
    if ($scope.viewDetail) {
      $scope.contentType = 'set';
      $scope.urlPath = '/' + $scope.viewUser + '/sets/' + $scope.viewDetail;
      soundcloud.getSet($scope);
    } else if ($scope.viewType == 'sets') {
      $scope.contentType = 'tracks';
      $scope.scget = '/users/' + $scope.viewUser + '/playlists';
      soundcloud.getTracks($scope);  
    } else if ($scope.viewType == 'likes') {
      $scope.contentType = 'tracks';
      $scope.scget = '/users/' + $scope.viewUser + '/favorites';
      soundcloud.getTracks($scope);
    } else if ($scope.viewType == 'following') {
      $scope.contentType = 'users';
      soundcloud.getFollowings($scope, $scope.viewUser);
      $scope.sorts = [
        { json: 'followers_count', human: 'Popularity', reverse: true },
        { json: 'username', human: 'Alphabetical', reverse: false }
      ];
      $scope.sortFollowings = $scope.sorts[0];
    } else if ($scope.viewType) {
      $scope.contentType = 'track';
      $scope.urlPath = '/' + $scope.viewUser + '/' + $scope.viewType;
      soundcloud.getTrack($scope);
    } else {
      $scope.contentType = 'tracks';
      $scope.scget = '/users/' + $scope.viewUser + '/tracks';
      soundcloud.getTracks($scope);
    };
     
  }])
  
  /*
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
//    $scope.pageOffset = 1; // hiding pagination from tracklist partial
    soundcloud.getTrack($scope);
  }])
  
  .controller('SetCtrl', ['$scope', 'soundcloud', 'player', function($scope, soundcloud, player){
    $scope.viewUser = $scope.$routeParams.viewUser;
    $scope.setUrl = $scope.$routeParams.set;
    $scope.urlPath = '/' + $scope.viewUser + '/sets/' + $scope.setUrl;
    soundcloud.getSet($scope);
  }])
*/
  
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
 
  .controller('PlayerCtrl', ['$scope', 'soundcloud', 'player', 'audio', function($scope, soundcloud, player, audio) {
    //console.log('PlayerCtrl');
    // Do I need these?
    $scope.player = player;
    $scope.audio = audio;
    
    $scope.toggleActions = function(){ $scope.viewActions = !$scope.viewActions; };
    
    $scope.toggleLoop = function(){ player.loop = !player.loop; };
      
  }])
  
  .controller('ScrubberCtrl', ['$scope', 'audio', function($scope, audio){
      // Scrubbers
      function updateView() {
        $scope.$apply(function() {
          $scope.currentBufferPercentage = ((audio.buffered.length && audio.buffered.end(0)) / audio.duration) * 100;
          $scope.currentTimePercentage = (audio.currentTime / audio.duration) * 100;
          $scope.currentTimeMS = (audio.currentTime * 1000).toFixed();
          $scope.durationMS = (audio.duration * 1000).toFixed();
        });
      };
      

      
      audio.addEventListener('timeupdate', updateView, false);
    
      // Seeking
      $scope.seekTo = function($event){
        var xpos = $event.offsetX / $event.target.offsetWidth;
        audio.currentTime = (xpos * audio.duration);
      };
  }])
  

  .controller('TrackCtrl', ['$scope', 'soundcloud', 'player', 'audio', function($scope, soundcloud, player, audio){
    if ($scope.connected) {
      //$scope.liked = $scope.track.user_favorite;
    };
      
      
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
  
  
  
  
  
      /* // maybe try this for getuser
    var lastRoute = $route.current;
    if ($route.current.$route.templateUrl.indexOf('mycurrentpath') > 0) {
        $route.current = lastRoute;         
    }
    */