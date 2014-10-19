'use strict';
// Beta config
var clientID = '66828e9e2042e682190d1fde4b02e265';
var callbackUrl = 'http://beta.soundrad.com/callback';
// Official config
// var clientID = '683f27c0c6dace16e7498ebffcbef8be';
// var callbackUrl = 'http://soundrad.com/callback';
angular.module('sticky', []).directive('sticky', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'A',
      scope: {
        offset: '@',
        stickyClass: '@'
      },
      link: function ($scope, $elem, $attrs) {
        $timeout(function () {
          var offsetTop = $scope.offset || 0, stickyClass = $scope.stickyClass || '', $window = angular.element(window), doc = document.documentElement, initialPositionStyle = $elem.css('position'), stickyLine, scrollTop;
          // Set the top offset
          //
          $elem.css('top', offsetTop + 'px');
          // Get the sticky line
          //
          function setInitial() {
            stickyLine = $elem[0].offsetTop - offsetTop;
            checkSticky();
          }
          // Check if the window has passed the sticky line
          //
          function checkSticky() {
            scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
            if (scrollTop >= stickyLine) {
              $elem.addClass(stickyClass);
              $elem.css('position', 'fixed');
            } else {
              $elem.removeClass(stickyClass);
              $elem.css('position', initialPositionStyle);
            }
          }
          // Handle the resize event
          //
          function resize() {
            $elem.css('position', initialPositionStyle);
            $timeout(setInitial);
          }
          // Attach our listeners
          //
          $window.on('scroll', checkSticky);
          $window.on('resize', resize);
          setInitial();
        });
      }
    };
  }
]);
'use strict';
var app = angular.module('app', [
    'ngTouch',
    'ngRoute',
    'sticky'
  ]);
app.config([
  '$routeProvider',
  '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: '/partials/stream.html',
      controller: 'StreamCtrl'
    });
    $routeProvider.when('/callback', {
      templateUrl: '/partials/callback.html',
      controller: 'CallbackCtrl'
    });
    $routeProvider.when('/settings', {
      templateUrl: '/partials/settings.html',
      controller: 'SettingsCtrl'
    });
    $routeProvider.when('/search', {
      templateUrl: '/partials/search.html',
      controller: 'SearchCtrl'
    });
    $routeProvider.when('/:user', {
      templateUrl: '/partials/user.html',
      controller: 'UserCtrl'
    });
    $routeProvider.when('/:user/likes', {
      templateUrl: '/partials/likes.html',
      controller: 'LikesCtrl'
    });
    $routeProvider.when('/:user/sets', {
      templateUrl: '/partials/sets.html',
      controller: 'SetsCtrl'
    });
    $routeProvider.when('/:user/sets/:set/:secret?', {
      templateUrl: '/partials/set.html',
      controller: 'SetCtrl'
    });
    $locationProvider.html5Mode(true);
  }
]);
'use strict';
app.factory('soundcloud', [
  '$window',
  '$http',
  'storage',
  function ($window, $http, storage) {
    var soundcloud = {};
    var token = storage.get('token');
    soundcloud.api = 'https://api.soundcloud.com';
    soundcloud.params = {
      client_id: clientID,
      oauth_token: token,
      offset: 0,
      limit: 24
    };
    soundcloud.next_href = null;
    soundcloud.connect = function () {
      $window.location.href = 'https://soundcloud.com/connect?client_id=' + clientID + '&redirect_uri=' + callbackUrl + '&response_type=code_and_token&scope=non-expiring&display=popup';
    };
    soundcloud.get = function (path, callback) {
      this.params.url = null;
      this.params.callback = null;
      $http.get(this.api + path, { params: this.params }).error(function (err) {
        console.error('error', err);
      }).success(function (data) {
        if (callback)
          callback(data);
      });
    };
    soundcloud.jsonp = function (path, callback) {
      this.params.callback = 'JSON_CALLBACK';
      $http.jsonp(this.api + path + '.json', { params: this.params }).error(function (err) {
        console.error('error', err);
      }).success(function (data) {
        if (callback)
          callback(data);
      });
    };
    soundcloud.getStream = function (callback) {
      this.params.callback = null;
      this.params.url = null;
      $http.get(this.api + '/me/activities/tracks', { params: this.params }).error(function (err) {
        console.error('error', err);
      }).success(function (data) {
        soundcloud.next_href = data.next_href;
        var tracks = [];
        for (var i = 0; i < data.collection.length; i++) {
          tracks.push(data.collection[i].origin);
        }
        if (callback)
          callback(tracks);
      });
    };
    soundcloud.getStreamNextPage = function (callback) {
      $http.get(this.next_href, { params: this.params }).error(function (err) {
        console.error('error', err);
      }).success(function (data) {
        soundcloud.next_href = data.next_href;
        var tracks = [];
        for (var i = 0; i < data.collection.length; i++) {
          tracks.push(data.collection[i].origin);
        }
        if (callback)
          callback(tracks);
      });
    };
    soundcloud.like = function (track, callback) {
      $http.put(this.api + '/me/favorites/' + track.id, track, { params: this.params }).error(function (err) {
        console.error('error', err);
      }).success(function (data) {
        if (callback)
          callback(data);
      });
    };
    soundcloud.unlike = function (track, callback) {
      $http.delete(this.api + '/me/favorites/' + track.id, { params: this.params }).error(function (err) {
        console.error('error', err);
      }).success(function (data) {
        if (callback)
          callback(data);
      });
    };
    return soundcloud;
  }
]);
'use strict';
app.factory('player', [
  'soundcloud',
  function (soundcloud) {
    var player = {};
    player.params = '?';
    var paramsArray = [];
    for (var param in soundcloud.params) {
      paramsArray.push(encodeURIComponent(param) + '=' + encodeURIComponent(soundcloud.params[param]));
    }
    ;
    player.params += paramsArray.join('&');
    player.audio = document.createElement('audio');
    player.tracks = [];
    player.index = 0;
    player.currentTime;
    player.duration;
    player.playing = false;
    player.paused = null;
    player.load = function (tracks) {
      this.tracks = tracks;
      this.index = 0;
      if (!this.paused) {
        this.paused = this.tracks[0];
      }
    };
    player.play = function (index) {
      if (index != null)
        this.index = index;
      if (!this.tracks[this.index])
        return false;
      var track = this.tracks[this.index];
      if (this.audio.src != track.stream_url + this.params) {
        this.audio.src = track.stream_url + this.params;
      }
      this.audio.play();
      this.playing = track;
      this.paused = false;
    };
    player.pause = function () {
      this.audio.pause();
      this.paused = this.playing;
      this.playing = false;
    };
    player.playPause = function () {
      if (this.paused) {
        if (!this.audio.src)
          this.audio.src = this.paused.stream_url + this.params;
        this.audio.play();
        this.playing = this.paused;
        this.paused = false;
      } else if (this.audio.paused) {
        if (!this.audio.src)
          this.audio.src = this.tracks[this.index].stream_url + this.params;
        this.audio.play();
        this.playing = this.tracks[this.index];
        this.paused = false;
      } else {
        this.audio.pause();
        this.paused = this.playing;
        this.playing = false;
      }
    };
    player.next = function () {
      if (this.index < this.tracks.length - 1) {
        this.index++;
        this.play();
      }
    };
    player.previous = function () {
      if (this.index > 0) {
        this.index--;
        this.play();
      }
    };
    player.seek = function (e) {
      if (!this.audio.readyState)
        return false;
      var xpos = e.offsetX / e.target.offsetWidth;
      this.audio.currentTime = xpos * this.audio.duration;
    };
    player.audio.addEventListener('ended', function () {
      player.next();
    }, false);
    return player;
  }
]);
'use strict';
app.factory('storage', function () {
  return {
    set: function (key, obj) {
      var string = JSON.stringify(obj);
      localStorage.setItem(key, string);
    },
    get: function (key, callback) {
      var data = localStorage.getItem(key);
      var obj = JSON.parse(data);
      return obj;
    },
    clear: function () {
      localStorage.clear();
    }
  };
});
'use strict';
app.directive('icon', function () {
  var sprite = {
      play: 'M0 0 L32 16 L0 32 z',
      pause: 'M0 0 H12 V32 H0 z M20 0 H32 V32 H20 z',
      previous: 'M0 0 H4 V14 L32 0 V32 L4 18 V32 H0 z',
      next: 'M0 0 L28 14 V0 H32 V32 H28 V18 L0 32 z',
      close: 'M4 8 L8 4 L16 12 L24 4 L28 8 L20 16 L28 24 L24 28 L16 20 L8 28 L4 24 L12 16 z',
      chevronRight: 'M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z',
      chevronLeft: 'M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z',
      heart: 'M0 10 C0 6, 3 2, 8 2 C12 2, 15 5, 16 6 C17 5, 20 2, 24 2 C30 2, 32 6, 32 10 C32 18, 18 29, 16 30 C14 29, 0 18, 0 10'
    };
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, elem, attrs) {
      var el = elem[0], id = attrs.icon, path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      if (!sprite[id])
        return false;
      el.classList.add('plangular-icon', 'plangular-icon-' + id);
      el.setAttribute('viewBox', '0 0 32 32');
      el.setAttribute('style', 'max-height:100%');
      el.setAttribute('fill', 'currentcolor');
      path.setAttribute('d', sprite[id]);
      el.appendChild(path);
    }
  };
});
'use strict';
app.filter('prettyTime', function () {
  return function (value) {
    var hours = Math.floor(value / 3600), mins = '0' + Math.floor(value % 3600 / 60), secs = '0' + Math.floor(value % 60);
    mins = mins.substr(mins.length - 2);
    secs = secs.substr(secs.length - 2);
    if (!isNaN(secs)) {
      if (hours) {
        return hours + ':' + mins + ':' + secs;
      } else {
        return mins + ':' + secs;
      }
      ;
    } else {
      return '00:00';
    }
    ;
  };
});
'use strict';
app.controller('MainCtrl', [
  '$scope',
  '$window',
  '$location',
  'storage',
  'soundcloud',
  'player',
  function ($scope, $window, $location, storage, soundcloud, player) {
    $scope.currentUser = storage.get('currentUser');
    $scope.token = storage.get('token');
    $scope.player = player;
    $scope.audio = player.audio;
    $scope.view = { current: null };
    $scope.user = {};
    $scope.user.username = '';
    $scope.errors = [];
    // Get token from URL hash
    if ($location.hash()) {
      var token = $location.hash().replace('#', '').split('&')[0].split('=')[1];
      if (token) {
        storage.set('token', token);
        $scope.token = token;
        soundcloud.params.oauth_token = token;
        soundcloud.get('/me', function (data) {
          $scope.currentUser = data;
          storage.set('currentUser', data);
        });
        $location.search('');
        $location.hash('');
      }
      ;
    }
    ;
    $scope.connect = soundcloud.connect;
    $scope.logout = function () {
      storage.clear();
      $window.location.href = '/';
    };
    player.audio.addEventListener('timeupdate', function () {
      $scope.$apply(function () {
        $scope.currentTime = player.audio.currentTime;
      });
    });
  }
]);
'use strict';
app.controller('TracklistCtrl', [
  '$scope',
  'soundcloud',
  'player',
  function ($scope, soundcloud, player) {
    $scope.hasNextPage = true;
    $scope.nextPage = function () {
      $scope.isLoading = true;
      if ($scope.isStream) {
        soundcloud.getStreamNextPage(function (data) {
          $scope.tracks = $scope.tracks.concat(data);
          player.tracks = $scope.tracks;
          $scope.isLoading = false;
        });
      } else {
        $scope.page++;
        soundcloud.params.offset = $scope.page * soundcloud.params.limit;
        soundcloud.get($scope.endpoint, function (data) {
          if (!data.length) {
            $scope.hasNextPage = false;
            $scope.isLoading = false;
            return false;
          }
          if ($scope.isPlaylist) {
            $scope.tracks = $scope.tracks.concat(data.tracks);
          } else {
            $scope.tracks = $scope.tracks.concat(data);
          }
          player.tracks = $scope.tracks;
          $scope.isLoading = false;
        });
      }
    };
    $scope.like = function (track) {
      if (!$scope.token)
        return false;
      console.log('like');
      soundcloud.like(track, function (response) {
        track.user_favorite = true;
      });
    };
    $scope.unlike = function (track) {
      if (!$scope.token)
        return false;
      console.log('unlike');
      soundcloud.unlike(track, function (response) {
        track.user_favorite = false;
      });
    };
  }
]);
'use strict';
app.controller('StreamCtrl', [
  '$scope',
  'soundcloud',
  'player',
  function ($scope, soundcloud, player) {
    $scope.isLoading = true;
    $scope.isStream = true;
    $scope.view.current = 'stream';
    soundcloud.getStream(function (data) {
      $scope.tracks = data;
      $scope.isLoading = false;
      player.load(data);
    });
  }
]);
'use strict';
app.controller('UserCtrl', [
  '$scope',
  '$routeParams',
  'soundcloud',
  'player',
  function ($scope, $routeParams, soundcloud, player) {
    $scope.page = 0;
    soundcloud.params.offset = $scope.page * soundcloud.params.limit;
    $scope.isLoading = true;
    if ($routeParams.user == $scope.currentUser.permalink) {
      $scope.view.current = 'me';
    } else {
      $scope.view.current = 'user';
    }
    $scope.endpoint = '/users/' + $routeParams.user + '/tracks';
    //soundcloud.get('/users/' + $routeParams.user, function(data) {
    //  $scope.user = data;
    //});
    soundcloud.get($scope.endpoint, function (data) {
      $scope.tracks = data;
      $scope.user = data[0].user;
      player.load(data);
      $scope.isLoading = false;
    });
  }
]);
'use strict';
app.controller('LikesCtrl', [
  '$scope',
  '$routeParams',
  'soundcloud',
  'player',
  function ($scope, $routeParams, soundcloud, player) {
    $scope.page = 0;
    soundcloud.params.offset = $scope.page * soundcloud.params.limit;
    $scope.isLoading = true;
    $scope.view.current = 'likes';
    $scope.endpoint = '/users/' + $routeParams.user + '/favorites';
    soundcloud.get('/users/' + $routeParams.user, function (data) {
      $scope.user = data;
      $scope.user.subview = 'Likes';
    });
    soundcloud.get($scope.endpoint, function (data) {
      $scope.tracks = data;
      player.load(data);
      $scope.isLoading = false;
    });
  }
]);
'use strict';
app.controller('SetsCtrl', [
  '$scope',
  '$routeParams',
  'soundcloud',
  function ($scope, $routeParams, soundcloud) {
    $scope.page = 0;
    soundcloud.params.offset = $scope.page * soundcloud.params.limit;
    $scope.isLoading = true;
    $scope.view.current = 'sets';
    $scope.endpoint = '/users/' + $routeParams.user + '/playlists';
    soundcloud.get($scope.endpoint, function (data) {
      $scope.tracks = data;
      $scope.user = data[0].user;
      if ($scope.user) {
        $scope.user.subview = 'Playlists';
      }
      $scope.isLoading = false;
    });
  }
]);
'use strict';
app.controller('SetCtrl', [
  '$scope',
  '$routeParams',
  'soundcloud',
  'player',
  function ($scope, $routeParams, soundcloud, player) {
    $scope.page = 0;
    soundcloud.params.offset = $scope.page * soundcloud.params.limit;
    $scope.isLoading = true;
    $scope.isPlaylist = true;
    $scope.endpoint = '/resolve';
    soundcloud.params.url = 'http://soundcloud.com/' + $routeParams.user + '/sets/' + $routeParams.set;
    if ($routeParams.secret) {
      soundcloud.params.url += '/' + $routeParams.secret;
    }
    soundcloud.jsonp($scope.endpoint, function (data) {
      $scope.set = data;
      $scope.user = data.user;
      $scope.tracks = data.tracks;
      $scope.endpoint = '/playlists/' + data.id;
      player.load(data.tracks);
      $scope.isLoading = false;
    });
  }
]);