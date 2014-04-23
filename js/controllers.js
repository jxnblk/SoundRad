
'use strict';


soundrad.controller('PlayerCtrl', ['$scope', 'player', 'audio', function($scope, player, audio) {
  $scope.player = player;
  $scope.audio = audio;
  Mousetrap.bind(['j', 'shift+right'], function(){
    $scope.$apply(function(){
      player.next();
    });
  });
  Mousetrap.bind(['k', 'shift+left'], function(){
    $scope.$apply(function(){
      player.prev();
    });
  });
  Mousetrap.bind('space', function(e) {
    e.preventDefault();
    $scope.$apply(function(){
      player.toggle();
    });
  });
}]);

soundrad.controller('HeadCtrl', ['$scope', 'player', function($scope, player) {
  $scope.title = function() {
    if (player.playing) {
      return '► ' + player.tracks[player.i].title + ' | SoundRad';
    } else if (player.paused) {
      return player.tracks[player.i].title + ' | SoundRad';
    } else {
      return 'SoundRad';  
    };
  };
}]);
  
soundrad.controller('ScrubberCtrl', ['$scope', 'audio', function($scope, audio) {
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
}]);
  
soundrad.controller('NavCtrl',
  ['$scope', '$routeParams', '$window', '$location', 'soundcloud', 'storage',
  function($scope, $routeParams, $window, $location, soundcloud, storage) {
  // Defaults
  $scope.user = 'test';
  $scope.userData = null;
  $scope.page = 1;
  $scope.pageSize = 16;
  $scope.pageOffset = 0;
  $scope.$routeParams = $routeParams;
  $scope.token = storage.get('token');
  $scope.me = storage.get('me');
  $scope.isConnecting = false;
  $scope.modal = null;
  // Fake UI empty state loading
  $scope.setEmptyState = function() {
    $scope.tracks = [ { user: { username: '\xa0' }, title: '\xa0' }, { user: { username: '\xa0' }, title: '\xa0' },
      { user: { username: '\xa0' }, title: '\xa0' }, { user: { username: '\xa0' }, title: '\xa0' },
      { user: { username: '\xa0' }, title: '\xa0' }, { user: { username: '\xa0' }, title: '\xa0' },
      { user: { username: '\xa0' }, title: '\xa0' }, { user: { username: '\xa0' }, title: '\xa0' },
      { user: { username: '\xa0' }, title: '\xa0' }, { user: { username: '\xa0' }, title: '\xa0' },
      { user: { username: '\xa0' }, title: '\xa0' }, { user: { username: '\xa0' }, title: '\xa0' } ];
  };

  // Get token from url hash after auth
  if($location.hash()){
    console.log('getting token from hash');
    var token = $location.hash().replace('#','').split('&')[0].split('=')[1];
    if(token) {
      storage.set('token', token);
      $scope.token = token;
      $scope.isConnecting = true;
      // May need to refresh the page
    };
  };
  var getUserPlaylists = function(){
    soundcloud.getUserPlaylists(function(data){
      $scope.$apply(function(){
        $scope.userPlaylists = data;
      });
    });
  };
  if ($scope.token){
    soundcloud.reconnect($scope.token);
    soundcloud.me(function(me){
      $scope.me = me;
      storage.set('me', me);
      getUserPlaylists();
    });
  };
  $scope.connect = function() {
    soundcloud.connect();
  };
  $scope.logOut = function() {
    storage.clearAll();
    $window.location.href = '/';
  };
  $scope.openModal = function(obj){
    $scope.modal = obj;
  };
  $scope.closeModal = function() {
    $scope.modal = null;
  };
  Mousetrap.bind('g s', function(){
    $scope.$apply(function(){
      $location.path('/');
    });
  });
  Mousetrap.bind('g m', function(){
    $scope.$apply(function(){
      $location.path('/' + $scope.me.permalink);
    });
  });
  Mousetrap.bind('g l', function(){
    $scope.$apply(function(){
      $location.path('/' + $scope.me.permalink + '/likes');
    });
  });
  Mousetrap.bind('g p', function(){
    $scope.$apply(function(){
      $location.path('/' + $scope.me.permalink + '/sets');
    });
  });
  Mousetrap.bind('/', function(e){
    e.preventDefault();
    $scope.$apply(function(){
      $location.path('/search');
    });
  });
  Mousetrap.bind('esc', function(e){
    e.preventDefault();
    $scope.$apply(function(){
      $scope.closeModal();
    });
  });
}]);
  
soundrad.controller('CallbackCtrl', ['$scope', '$location', function($scope, $location){
  $location.path('/');
}]);
  
soundrad.controller('StreamCtrl', ['$scope', '$location', 'soundcloud', 'player', function($scope, $location, soundcloud, player) {
  $scope.page = 1;
  $scope.isLoading = true;
  $scope.player = player;
  var url = '/me/activities/tracks';
  var params = { limit: $scope.pageSize };
  $scope.setEmptyState();

  soundcloud.getStream(url, params, function(data, tracks){
    $scope.$apply(function(){
      $scope.tracks = tracks;
      $scope.isLoading = false;
      $scope.streamNextPage = data.next_href;
      if(!player.playing) {
        player.load($scope.tracks);
      };
    });
  });
  // Stream Pagination
  $scope.loadMore = function() {
    if($scope.isLoading) return false;
    $scope.isLoading = true;
    var url = $scope.streamNextPage;
    var params = { limit: $scope.pageSize };
    soundcloud.getStream(url, params, function(data, tracks){
      $scope.$apply(function(){
        if($scope.tracks[$scope.tracks.length-1].id == player.tracks[player.tracks.length-1].id) {
          player.tracks = player.tracks.concat(tracks);
        };
        $scope.tracks = $scope.tracks.concat(tracks);
        $scope.isLoading = false;
        $scope.streamNextPage = data.next_href;
      });
    });
    $scope.page = $scope.page + 1;
    //$location.hash($scope.page);
  };
  
}]);
  
soundrad.controller('UserCtrl', ['$scope', '$sce', 'soundcloud', '$routeParams', 'player', function($scope, $sce, soundcloud, $routeParams, player) {
  $scope.isLoading = true;
  $scope.isSetlist = false;
  $scope.player = player;
  $scope.state = $routeParams;
  var params = { limit: $scope.pageSize, offset: $scope.pageOffset };


  if ($routeParams.user != $scope.$parent.user) {
    $scope.$parent.user = $routeParams.user;
    soundcloud.getUser($scope.$parent.user, function(data){
      $scope.$apply(function(){
        $scope.$parent.userData = data;
        $scope.userDescription = $sce.trustAsHtml(data.description);
        $scope.username = data.username;
        $scope.followersCount = parseInt(data.followers_count);
        $scope.followingsCount = parseInt(data.followings_count);
      });
    });
  };
  
  $scope.follow = function(userid) { soundcloud.follow(userid); };
  $scope.unfollow = function(userid) { soundcloud.unfollow(userid); };
    
  var getTracks = function() {
    $scope.setEmptyState();
    soundcloud.getTracks($scope.api, params, function(data){
      $scope.$apply(function(){
        $scope.tracks = data;
        $scope.hasPrevPage = ($scope.pageOffset >= $scope.pageSize);
        $scope.hasNextPage = ($scope.tracks.length >= $scope.pageSize);
        $scope.isLoading = false;
        if(!player.playing) player.load($scope.tracks);
      });
    });
  };

  var getTrack = function(){
    soundcloud.getTrack($scope.api, function(data){
      $scope.$apply(function () {
        //$scope.tracks = new Array(data);
        $scope.tracks = null;
        $scope.track = data;
        //$scope.description = $sce.trustAsHtml(data.description);
        $scope.hasPrevPage = false;
        $scope.hasNextPage = false;
        $scope.isLoading = false;
        if(!player.playing) player.load($scope.track);
      });
    });
  };

  var getSet = function(){
    $scope.setEmptyState();
    soundcloud.getSet($scope.api, function(data){
      $scope.$apply(function () {
        $scope.set = data;
        $scope.tracks = data.tracks;
        $scope.hasPrevPage = false;
        $scope.hasNextPage = false;
        $scope.streamNextPage = false;
        $scope.isLoading = false;
        if(!player.playing) player.load($scope.tracks);
      });
    });
  };

  if (!$routeParams.setTitle && $routeParams.subpath == 'sets') $scope.isSetlist = true;
  if (!$routeParams.subpath) {
    $scope.api = '/users/' + $scope.user + '/tracks';
    getTracks();
  } else if ($routeParams.subpath == 'likes') {
    $scope.api = '/users/' + $scope.user + '/favorites';
    getTracks();
  } else if ($routeParams.setTitle) {
    $scope.api = '/' + $scope.user + '/sets/' + $routeParams.setTitle;
    getSet();
  } else if ($routeParams.subpath == 'sets') {
    $scope.api = '/users/' + $scope.user + '/playlists';
    getTracks();
  } else {
    $scope.api = '/' + $scope.user + '/' + $routeParams.subpath;
    getTrack();
  };

  // $scope.description = $sce.trustAsHtml($scope.userData.description);
}]);

soundrad.controller('TracklistCtrl', ['$scope', '$location', 'soundcloud', 'player', function($scope, $location, soundcloud, player) {
  $scope.player = player;
  $scope.loadMore = function(){
    if($scope.isLoading) return false;
    if($scope.hasNextPage){
      $scope.isLoading = true;
      $scope.pageOffset = $scope.pageOffset + $scope.pageSize;
      var params = { limit: $scope.pageSize, offset: $scope.pageOffset };
      soundcloud.getTracks($scope.api, params, function(data){
        $scope.$apply(function(){
          if(player.tracks){
            if($scope.tracks[$scope.tracks.length-1].id == player.tracks[player.tracks.length-1].id) {
              player.tracks = player.tracks.concat(data);
            };
          };
          $scope.tracks = $scope.tracks.concat(data);
          $scope.hasNextPage = ($scope.tracks.length >= $scope.pageSize);
          $scope.isLoading = false;
        });
      });
      $scope.page++;
      //$location.hash($scope.page);
    };
  };
}]);
  
soundrad.controller('TrackCtrl', ['$scope', 'soundcloud', function($scope, soundcloud) {
  $scope.like = function(track) {        
    if($scope.token){
      track.user_favorite = true;
      soundcloud.like(track, function(data){
        $scope.$apply(function(){
          track.user_favorite = true;
        });           
      });
    } else {
      $scope.connect();
    };
  };
  $scope.unlike = function(track) {
    track.user_favorite = false;  
    soundcloud.unlike(track, function(data){
      $scope.$apply(function(){
        track.user_favorite = false;  
      });
    });
  };
}]);

soundrad.controller('AddToSetCtrl', ['$scope', '$timeout', 'soundcloud', function($scope, $timeout, soundcloud) {
  $scope.wasAdded = null;
  $scope.addToPlaylist = function(track, playlist) {
    soundcloud.addToPlaylist(track, playlist, function(data){
      $scope.$apply(function(){
        console.log('Added to ' + data.title);
        $scope.wasAdded = data.id;
        $timeout(function(){
          $scope.wasAdded = null;
          $scope.closeModal();
        }, 800);
      });
      
    });
  };
  $scope.createPlaylist = function(name, track){
    var tracks = [];
    tracks.push(track.id);
    var tracks = tracks.map(function(id) { return { id: id } });
    var playlist = { playlist: { title: name, tracks: tracks } };
    soundcloud.createPlaylist(playlist, function(data){
      $scope.$apply(function(){
        console.log('Added to new playlist ' + data.title);
        //$scope.flashMessage = 'Added to new playlist ' + data.title;
        //$scope.addToPlaylistIsOpen = false;
        //$timeout(function(){
        //  $scope.flashMessage = null;
        //  $scope.dropdownIsOpen = false;  
        //}, 3500);
      });
    });
  };
}]);


soundrad.controller('SearchCtrl', ['$scope', '$location', 'soundcloud', function($scope, $location, soundcloud) {
  $scope.search = function(){
    $scope.isLoading = true;
    $scope.searchResults = null;
    $location.search('q', $scope.searchQuery); 

    $scope.pageOffset = 0;
    var params = { q: $scope.searchQuery };
    soundcloud.search(params, function(data){
      $scope.$apply(function(){
        $scope.searchResults = data.collection;  
        $scope.isLoading = false;
      });
    });
  };
  $scope.searchMore = function(){
    if($scope.isLoading || !$scope.searchResults) return false;
    $scope.isLoading = true;
    $scope.pageOffset = $scope.pageOffset + $scope.pageSize;
    var params = { q: $scope.searchQuery, offset: $scope.pageOffset };
    soundcloud.search(params, function(data) {
      $scope.$apply(function(){
        $scope.searchResults = $scope.searchResults.concat(data.collection);
        $scope.isLoading = false;
      });
    });
  };
  if ($location.search().q){
    $scope.searchQuery = $location.search().q;
    $scope.search();
  };
}]);

