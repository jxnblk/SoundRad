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
  
  .controller('NavCtrl', ['$scope', '$routeParams', '$window', '$location', 'soundcloud', 'storage', function($scope, $routeParams, $window, $location, soundcloud, storage) {
    
    $scope.version = storage.get('version');
    
    if(!$scope.version){
      console.log('Reseting localStorage - version 16');
      storage.clearAll();
      $scope.version = 16;
      storage.set('version', $scope.version);
    };
    
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

    $scope.preloadContent = null;
    $scope.preload = function(url, data) {
      $location.path(url);      
      $scope.preloadContent = data;
    };
    
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
    $scope.isDetail = false;
    $scope.contentLoading = true;
    $scope.pageSize = 16;
      
    if ($scope.viewDetail) {
      //Need to get the playlist ID first
      //$scope.scget = '/users/' + $scope.viewUser + '/playlists/';
      //$scope.urlPath = '/' + $scope.viewUser + '/sets/' + $scope.viewDetail;
      //soundcloud.getTracks($scope);
      
      if ($scope.preloadContent) {
        $scope.tracks = $scope.preloadContent;
        $scope.preloadContent = null;
        $scope.contentLoading = false;
      };
      $scope.urlPath = '/' + $scope.viewUser + '/sets/' + $scope.viewDetail;
      soundcloud.getSet($scope);
      
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
        //console.log('track detail view');
        // To-do plug in resolve call to get track details
        if ($scope.preloadContent) {
          $scope.tracks = new Array($scope.preloadContent);
          $scope.preloadContent = null;
          $scope.contentLoading = false;
        };
        $scope.urlPath = '/' + $scope.viewUser + '/' + $scope.viewType;
        soundcloud.getTrack($scope);
        $scope.isDetail = true;
    } else {
      $scope.scget = '/users/' + $scope.viewUser + '/tracks';
      soundcloud.getTracks($scope);
    };
    
  }])
  
  .controller('TracklistCtrl', ['$scope', '$location', '$anchorScroll', 'soundcloud', 'player', function($scope, $location, $anchorScroll, soundcloud, player) {
        //$scope.audio = audio;
    $scope.player = player;
    
    $scope.pageOffset = 0;
    $scope.page = 1;
    
    // Pagination
    // Stream Pagination
    $scope.showMoreStream = function() {
      //$scope.contentLoading = true;    
      $scope.scget = $scope.streamNextPage;
      soundcloud.getStream($scope, true);
    };
    
    // New Pagination
    $scope.updatePage = function(){
      $scope.page = ($scope.pageOffset + $scope.pageSize) / $scope.pageSize;
    };
    
    $scope.nextPage = function(){
      if($scope.hasNextPage){
        $scope.contentLoading = true;
          // Trying this to clear content when changing pages
          $scope.tracks = null;
        $scope.pageOffset = $scope.pageOffset + $scope.pageSize;
        $scope.updatePage();
        soundcloud.getTracks($scope);
      };
    };
    
    $scope.prevPage = function(){
      if($scope.pageOffset >= $scope.pageSize) {
        $scope.contentLoading = true;
        $scope.tracks = null;
        $scope.pageOffset = $scope.pageOffset - $scope.pageSize;        
        soundcloud.getTracks($scope);  
        $scope.updatePage(); 
      };      
    };
        
  }])
  
  .controller('TrackCtrl', ['$scope', 'soundcloud', function($scope, soundcloud) {
    
      $scope.showActions = false;
      $scope.toggleActions = function() {
        $scope.showActions = !$scope.showActions;
      };
    
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
  
  .controller('ThemeCtrl', ['$scope', function($scope) {
    
    $scope.themes = {
      'Default': 'theme-default',
      'Science': 'theme-science',
      'BLK': 'theme-blk'
    };
    
    //$scope.theme = ($scope.themes['Default']);
    
    $scope.changeTheme = function(name) {
      $scope.theme = $scope.themes[name];
    };
    
    $scope.changeTheme('Default');
    
  }])
  
  .controller('ModalCtrl', ['$scope', function($scope) {
    
  }])

;