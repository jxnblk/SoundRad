'use strict';

// Controllers


angular.module('scat.controllers', [])

  .controller('NavCtrl', ['$scope', '$route', '$routeParams', '$window', '$location', 'soundcloud', 'storage', function($scope, $route, $routeParams, $window, $location, soundcloud, storage) {
    
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
      soundcloud.getMe($scope);
// Testing getting sets
      soundcloud.getMeSets($scope);
    };
    
//// Figure out getMe - where is this being used and is it necessary?    
    
    $scope.connect = function() {
      soundcloud.connect($scope);
      //$location.path('/');
    };
    
    $scope.addConnectedUser = function() {
      $scope.connectedUserIndex = $scope.connectedUserIndex + 1;
      soundcloud.connect($scope);
    };
    
    $scope.switchUser = function($index) {
      $scope.username = localStorage.getItem('username-' + $index);
      $scope.token = localStorage.getItem('token-' + $index);
      soundcloud.connect($scope);
      if ($location.path() == '/'){
        $window.location.href = '/';  
      } else {
        $location.path('/');  
      };
    };
    
    $scope.logOut = function() {
      localStorage.clear();
      $window.location.href = '/';
    };
    
    
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
    };
    
    
    // iPhone Window Height
//    $('.contentWrapper').css('min-height', $(window).height() - 55 + 'px');
    $scope.winhi = $window.innerHeight + 12 + 'px';
    
    $scope.viewStyle = function(){
      if($scope.layout == 'mobile'){
        return { minHeight: $scope.winhi };
      };
    };
    
    
////////////////////////////////////////////////////////////////
// for testing

/* $scope.mysets = { name: 'test' } */


////////////////////////////////////////////////////////////////    
    
    
    // Global Modal Testing
    $scope.modal = {}

    $scope.openModal = function(content, params){
      console.log('modal' + content);
      $scope.modal.content = content;
      $scope.modal.params = params;
    };

    $scope.closeModal = function(){
      $scope.modal.content = null;
    };
    

    // Preload detail view content testing
    $scope.openTrack = function(track) {
      $scope.trackContent = track;
      $location.path('/' + track.user.permalink + '/' + track.permalink);
    };
    
    $scope.openSet = function(set) {
      $scope.setContent = set;
      $location.path('/' + set.user.permalink + '/sets/' + set.permalink);
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

    $scope.viewType = $scope.$routeParams.type;
    $scope.viewDetail = $scope.$routeParams.detail;
    
    $scope.viewUsername = $scope.$routeParams.viewUser;
    
    $scope.viewUser = $scope.$routeParams.viewUser;
    soundcloud.getUser($scope);
        
    // Pagination
    $scope.showMore = function() {
      $scope.tracksLoading = true;
      $scope.pageOffset = $scope.pageSize + $scope.pageOffset;
      soundcloud.addTracks($scope);  
    }; 
    
    if ($scope.viewDetail) {
      $scope.contentType = 'set';
      if($scope.setContent){
        console.log('got set content');
        $scope.set = $scope.setContent;
        $scope.tracks = $scope.setContent.tracks;
        //$scope.tracks = new Array($scope.trackContent);
      };
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
      
    } else if ($scope.viewType == 'info') {
      $scope.contentType = 'info';
      //soundcloud.getFollowings($scope, $scope.viewUser);
      
      
    } else if ($scope.viewType) {
      $scope.contentType = 'track';      
        // Trying to preload content on viewing detail page
        if($scope.trackContent){
          console.log('got track content');
          $scope.tracks = new Array($scope.trackContent);
        };
        console.log('looking up track content');
        $scope.urlPath = '/' + $scope.viewUser + '/' + $scope.viewType;
        soundcloud.getTrack($scope);

    } else {
      $scope.contentType = 'tracks';
      $scope.scget = '/users/' + $scope.viewUser + '/tracks';
      soundcloud.getTracks($scope);
    };
     
     
     $scope.testHTML = '<h1>Herro</h1><br><a href="http://jxnblk.com">jxnblk.com</a>';
     
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
  
  .controller('TracklistCtrl', ['$scope', 'player', 'audio', function($scope, player, audio){
    //console.log('TracklistCtrl');

  }])
 
  .controller('PlayerCtrl', ['$scope', 'player', 'audio', function($scope, player, audio) {
    //console.log('PlayerCtrl');

    $scope.player = player;
    $scope.audio = audio;
    $scope.toggleLoop = function(){ player.loop = !player.loop; };
    
    $scope.isPlaying = function(track){ return player.playing.id == track.id };
    $scope.isPaused = function(track){ return player.paused.id == track.id };
    
    $scope.audioReady = function(){
      return audio.readyState == 4
    };
    
    $scope.viewActions = false;
    
    $scope.toggleActions = function(){ $scope.viewActions = !$scope.viewActions; };
    $scope.closeActions = function(){$scope.viewActions = false; };
      
  }])
  
  .controller('ScrubberCtrl', ['$scope', 'audio', function($scope, audio){
      // Scrubbers
      //console.log('scrubberctrl');
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
            
      //console.log('trackctrl');
      
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
      
      
      
      
      
      
  }])
  
  .controller('ModalCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){
    $scope.addToSet = function(track, set){
      console.log('add to set');
      console.log(track);
      console.log(set);
      soundcloud.putToSet(set, track);
    };
  }])
  
  .controller('GlobalPlayerCtrl', ['$scope', 'player', function($scope, soundcloud, player, audio){
    

  }]);
  
  
  
  
  
      /* // maybe try this for getuser
    var lastRoute = $route.current;
    if ($route.current.$route.templateUrl.indexOf('mycurrentpath') > 0) {
        $route.current = lastRoute;         
    }
    */