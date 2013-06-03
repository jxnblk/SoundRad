'use strict';

/* Controllers */


angular.module('soundrad.controllers', [])


  .controller('PlayerCtrl', ['$scope', 'player', 'audio', function($scope, player, audio) {
  
    $scope.player = player;
    $scope.audio = audio;

  }])
  
  .controller('ScrubberCtrl', ['$scope', 'audio', function($scope, audio) {
      function updateView() {
        $scope.$apply(function() {
          $scope.currentBufferPercentage = ((audio.buffered.length && audio.buffered.end(0)) / audio.duration) * 100;
          $scope.currentTimePercentage = (audio.currentTime / audio.duration) * 100;
          $scope.currentTimeMS = (audio.currentTime * 1000).toFixed();
          $scope.durationMS = (audio.duration * 1000).toFixed();
        });
      };  
      audio.addEventListener('timeupdate', updateView, false);
      $scope.seekTo = function($event){
        var xpos = $event.offsetX / $event.target.offsetWidth;
        audio.currentTime = (xpos * audio.duration);
      };
  }])
  
  .controller('NavCtrl', ['$scope', '$routeParams', '$window', 'soundcloud', 'storage', function($scope, $routeParams, $window, soundcloud, storage) {
    
    $scope.token = storage.get('token');
    $scope.me = storage.get('me');
    
    if ($scope.token){
      soundcloud.connect($scope);
    };
    
    $scope.connect = function() {
      soundcloud.connect($scope);
    };
    
    $scope.logOut = function() {
      storage.clearAll();
      $window.location.href = '/';
    };
    
    $scope.$routeParams = $routeParams;
    
    $scope.modalContent = null;
    
  }])
  
  .controller('CallbackCtrl', ['$scope', '$window', '$timeout', function($scope, $window, $timeout){
    $timeout($window.close, 400);
    $window.opener.focus();
  }])
  
  .controller('StreamCtrl', ['$scope', 'soundcloud', function($scope, soundcloud) {
    $scope.scget = '/me/activities/tracks';
    $scope.pageSize = 16;
    soundcloud.getStream($scope);
  }])
  
  .controller('UserCtrl', ['$scope', 'soundcloud', function($scope, soundcloud) {
    $scope.viewType = $scope.$routeParams.type;
    $scope.viewDetail = $scope.$routeParams.detail;
      // Temporarily sets username before scget call finishes
      $scope.viewUsername = $scope.$routeParams.viewUser;
    $scope.viewUser = $scope.$routeParams.viewUser;
      // This is called for each subnav change
      // To do: Find a better way to handle this
      soundcloud.getUser($scope);

    $scope.contentLoading = true;
    $scope.pageSize = 16;
      
    if ($scope.viewDetail) {
      //Need to get the playlist ID first
      //$scope.scget = '/users/' + $scope.viewUser + '/playlists/';
      //$scope.urlPath = '/' + $scope.viewUser + '/sets/' + $scope.viewDetail;
      //soundcloud.getTracks($scope);
      
      console.log('need to setup get playlist functionality for set detail views');
      
    } else if ($scope.viewType == 'sets') {
      $scope.scget = '/users/' + $scope.viewUser + '/playlists';
          // Use smaller pageSize
          $scope.pageSize = 8;
      soundcloud.getTracks($scope);  
    } else if ($scope.viewType == 'likes') {
      $scope.scget = '/users/' + $scope.viewUser + '/favorites';
      soundcloud.getTracks($scope);
    } else if ($scope.viewType == 'following') {
      soundcloud.getFollowings($scope, $scope.viewUser);
        $scope.sorts = [
          { json: 'followers_count', human: 'Popularity', reverse: true },
          { json: 'username', human: 'Alphabetical', reverse: false }
        ];
        $scope.sortFollowings = $scope.sorts[0];      
    } else if ($scope.viewType == 'info') {
      //console.log('info view');
    } else if ($scope.viewType) {
        console.log('track detail view');
        // To-do plug in resolve call to get track details
        //$scope.urlPath = '/' + $scope.viewUser + '/' + $scope.viewType;
        //soundcloud.getTrack($scope);
    } else {
      $scope.scget = '/users/' + $scope.viewUser + '/tracks';
      soundcloud.getTracks($scope);
    };
    
  }])
  
  .controller('TracklistCtrl', ['$scope', 'soundcloud', 'player', function($scope, soundcloud, player) {
        //$scope.audio = audio;
    $scope.player = player;
    
    $scope.pageOffset = 0;
    $scope.page = 1;
    
    // Pagination
    $scope.showMore = function() {
      $scope.contentLoading = true;
      $scope.pageOffset = $scope.pageSize + $scope.pageOffset;
        // Make sure this isn't persistent when navigation away from stream
      if ($scope.streamNextPage) {
        $scope.scget = $scope.streamNextPage;
        soundcloud.getStream($scope);
      } else {
        soundcloud.getTracks($scope);  
      };
      $scope.page = $scope.page + 1;
    }; 
    
    
    
  }])
  
  .controller('TrackCtrl', ['$scope', 'soundcloud', function($scope, soundcloud) {
    
      $scope.like = function(trackid, params) {        
        if(params == 'isSetTrack') {
          $scope.setTrack.user_favorite = true;
        } else {
          $scope.track.user_favorite = true;
        };
        if($scope.token){
          soundcloud.like($scope, trackid);  
        } else {
          $scope.connect();
        };
      };
      $scope.unlike = function(trackid, params) {
        if(params == 'isSetTrack') {
          $scope.setTrack.user_favorite = false;
        } else {
          $scope.track.user_favorite = false;
        };
        soundcloud.unlike($scope, trackid);
      };
      
  }])
  
  .controller('ModalCtrl', ['$scope', function($scope) {
    
  }])

;