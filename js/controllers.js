'use strict';

//angular.module('soundrad.controllers', [])


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
  $scope.user = null;
  $scope.userData = null;

  $scope.page = 1;
  $scope.pageSize = 16;
  $scope.pageOffset = 0;

  $scope.$routeParams = $routeParams;
    
  $scope.token = storage.get('token');
  $scope.me = storage.get('me');

  // Get token from url hash
  if($location.hash()){
    var token = $location.hash().replace('#','').split('&')[0].split('=')[1];
    if(token) storage.set('token', token);
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

}]);
  
soundrad.controller('CallbackCtrl', ['$scope', '$location', function($scope, $location){
  $location.path('/');
}]);
  
soundrad.controller('StreamCtrl', ['$scope', 'soundcloud', 'player', function($scope, soundcloud, player) {
  $scope.page = 1;
  $scope.isLoading = true;
  $scope.player = player;
  var url = '/me/activities/tracks';
  var params = { limit: $scope.pageSize };
  soundcloud.getStream(url, params, function(data, tracks){
    $scope.$apply(function(){
      $scope.tracks = tracks;
      $scope.isLoading = false;
      $scope.streamNextPage = data.next_href;
      if(!player.playing && !player.paused) {
        player.load($scope.tracks);
      };
    });
  });
  // Stream Pagination
  $scope.loadMore = function() {
    if($scope.isLoading) return false;
    console.log('getting more for stream');
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
  };
  
}]);
  
soundrad.controller('UserCtrl', ['$scope', '$sce', 'soundcloud', '$routeParams', function($scope, $sce, soundcloud, $routeParams) {
    $scope.isLoading = true;
    $scope.isSetsList = false;
    $scope.user = $routeParams.user;
    soundcloud.getUser($scope.user, function(data){
      $scope.$apply(function(){
        $scope.userData = data;
        $scope.userDescription = $sce.trustAsHtml(data.description);
        $scope.username = data.username;
        $scope.followersCount = parseInt(data.followers_count);
        $scope.followingsCount = parseInt(data.followings_count);
      });
    });
    
    $scope.getTracks = function(){
      var params = { limit: $scope.pageSize, offset: $scope.pageOffset };
      soundcloud.getTracks($scope.api, params, function(data){
        $scope.$apply(function(){
          $scope.tracks = data;
          $scope.hasPrevPage = ($scope.pageOffset >= $scope.pageSize);
          $scope.hasNextPage = ($scope.tracks.length >= $scope.pageSize);
          $scope.isLoading = false;
        });
      });
    };
    
    $scope.follow = function(userid) {
      soundcloud.follow(userid);
    };
    $scope.unfollow = function(userid) {
      soundcloud.unfollow(userid);
    };
    
}]);
  
/*
soundrad.controller('LikesCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){
    $scope.tracks = null;
    $scope.isLoading = true;
    $scope.api = '/users/' + $scope.user + '/favorites';
    //$scope.api = '/users/' + $scope.user + '/favorites';
    var params = { limit: $scope.pageSize, offset: $scope.pageOffset };
    soundcloud.getTracks($scope.api, params, function(data){
      $scope.$apply(function(){
        $scope.tracks = data;
        $scope.hasPrevPage = ($scope.pageOffset >= $scope.pageSize);
        $scope.hasNextPage = ($scope.tracks.length >= $scope.pageSize);
        $scope.isLoading = false;
      });
    });
}]);
*/
  
/*
soundrad.controller('SetsCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){
    $scope.tracks = null;
    $scope.isLoading = true;
    $scope.isSetsList = true;
    $scope.api = '/users/' + $scope.user + '/playlists';
    if($scope.user == $scope.me.permalink && $scope.userPlaylists) {
      $scope.tracks = $scope.userPlaylists;
    };
    var params = { limit: $scope.pageSize, offset: $scope.pageOffset };
    soundcloud.getTracks($scope.api, params, function(data){
      $scope.$apply(function(){
        $scope.tracks = data;
        $scope.hasPrevPage = ($scope.pageOffset >= $scope.pageSize);
        $scope.hasNextPage = ($scope.tracks.length >= $scope.pageSize);
        $scope.isLoading = false;
      });
    });
}]);
*/
  
/*
soundrad.controller('TrackDetailCtrl', ['$scope', 'soundcloud', '$stateParams', 'player', function($scope, soundcloud, $stateParams, player){
  
  $scope.player = player;

  $scope.isLoading = true;
  
  var path = '/' + $scope.user + '/' + $stateParams.track;
  soundcloud.getTrack(path, function(data){
    $scope.$apply(function () {
      $scope.tracks = new Array(data);
      $scope.track = data;
      $scope.hasPrevPage = false;
      $scope.hasNextPage = false;
      $scope.isLoading = false;
      if(!player.playing && !player.paused) player.load($scope.track);
    });
  });
}]);
*/
  
/*
soundrad.controller('SetDetailCtrl', ['$scope', 'soundcloud', '$stateParams', 'player', function($scope, soundcloud, $stateParams, player){
  $scope.isLoading = true;

  $scope.getSet = function(){
    var path = '/' + $scope.user + '/sets/' + $stateParams.set;
    soundcloud.getSet(path, function(data){
      $scope.$apply(function () {
        $scope.set = data;
        $scope.tracks = data.tracks;
        $scope.hasPrevPage = false;
        $scope.hasNextPage = false;
        $scope.streamNextPage = false;
        $scope.isLoading = false;
        if(!player.playing && !player.paused) player.load($scope.tracks);
      });
    });
  };
  $scope.getSet();

  $scope.isEditable = false;
  $scope.toggleIsEditable = function(){ $scope.isEditable = !$scope.isEditable; };
  
  $scope.updatePlaylist = function(){
    if(player.tracks == $scope.set.tracks) {
      var i;
      for(i in $scope.set.tracks){
        if($scope.set.tracks[i].id == player.playing.id){
          player.i = parseInt(i);
          player.tracks = $scope.set.tracks;
        };
      };
    };
    soundcloud.updatePlaylist($scope.set, function(data){
    });
  };

  $scope.sortableOptions = { stop: function(e, ui) { $scope.updatePlaylist(); } }, { revert: true };

}]);
*/
  
/*
soundrad.controller('InfoCtrl', ['$scope', '$sce', 'soundcloud', function($scope, $sce, soundcloud){
  // $scope.description = $sce.trustAsHtml($scope.userData.description);
}]);
*/
  
/*
soundrad.controller('FollowingCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){
  $scope.isLoading = true;
  soundcloud.getFollowings($scope.user, function(data){
    $scope.$apply(function(){
      $scope.followings = data;
      $scope.isLoading = false;
    });
  });
  $scope.sorts = [
    { json: 'followers_count', human: 'Popularity', reverse: true },
    { json: 'username', human: 'Alphabetical', reverse: false }
  ];
  $scope.sortFollowings = $scope.sorts[0];  
}]);
  
soundrad.controller('FollowersCtrl', ['$scope', 'soundcloud', function($scope, soundcloud){
  $scope.isLoading = true;
  soundcloud.getFollowers($scope.user, function(data){
    $scope.$apply(function(){
      $scope.followers = data;
      $scope.isLoading = false;
    });
  });
  $scope.sorts = [
    { json: 'followers_count', human: 'Popularity', reverse: true },
    { json: 'username', human: 'Alphabetical', reverse: false }
  ];
  $scope.sortFollowers = $scope.sorts[0];
}]);
*/
  
soundrad.controller('TracklistCtrl', ['$scope', 'soundcloud', 'player', function($scope, soundcloud, player) {

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
    };
  };

}]);
  
soundrad.controller('TrackCtrl', ['$scope', '$timeout', 'soundcloud', function($scope, $timeout, soundcloud) {

  $scope.dropdownIsOpen = false;
  $scope.toggleDropdown = function() {
    $scope.dropdownIsOpen = ! $scope.dropdownIsOpen;
    $scope.addToPlaylistIsOpen = false;
    $scope.shareIsOpen = false;
  };

  $scope.addToPlaylistIsOpen = false;
  $scope.toggleAddToPlaylist = function() { 
    $scope.addToPlaylistIsOpen = ! $scope.addToPlaylistIsOpen;
  };

  $scope.shareIsOpen = false;
  $scope.toggleShare = function() { $scope.shareIsOpen = !$scope.shareIsOpen; };

  $scope.like = function(track) {        
    if($scope.token){
      soundcloud.like(track, function(data){
        $scope.$apply(function(){
          track.user_favorite = true;
          $timeout(function(){
            $scope.dropdownIsOpen = false;
          }, 1000);
        });           
      });
    } else {
      $scope.connect();
    };
  };
  $scope.unlike = function(track) {
    soundcloud.unlike(track, function(data){
      $scope.$apply(function(){
        track.user_favorite = false;  
        $timeout(function(){
          $scope.dropdownIsOpen = false;
        }, 1000);
      });
    });
  };

  $scope.flashMessage = null;

  $scope.addToPlaylist = function(track, playlist) {
    soundcloud.addToPlaylist(track, playlist, function(data){
      $scope.$apply(function(){
        $scope.flashMessage = 'Added to ' + data.title;
        $scope.addToPlaylistIsOpen = false;
        $timeout(function(){
          $scope.flashMessage = null;
          $scope.dropdownIsOpen = false;  
        }, 3500);
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
        $scope.flashMessage = 'Added to new playlist ' + data.title;
        $scope.addToPlaylistIsOpen = false;
        $timeout(function(){
          $scope.flashMessage = null;
          $scope.dropdownIsOpen = false;  
        }, 3500);
      });
    });
  };

  $scope.removeIsOpen = false;
  $scope.toggleRemove = function() { $scope.removeIsOpen = !$scope.removeIsOpen; };

  $scope.removeFromPlaylist = function(track, playlist) {
    $scope.isRemoving = track.id;
    soundcloud.removeFromPlaylist(track, playlist, function(data){
      $scope.$apply(function(){
        $scope.set = data;
        $scope.getSet();
        $scope.tracks = [];
        $scope.tracks = data.tracks;
        $scope.removeIsOpen = false;
        $scope.isRemoving = null;
      });
    });
  };

}]);

soundrad.controller('SearchCtrl', ['$scope', '$location', 'soundcloud', function($scope, $location, soundcloud) {

  $scope.search = function(){
    $scope.isLoading = true;
    $scope.searchResults = null;
    $location.search($scope.searchQuery); 

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

}]);
  
  
