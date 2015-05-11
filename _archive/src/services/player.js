
'use strict';

app.factory('player', function(soundcloud) {

  var player = {};
  player.params = '?';

  var paramsArray = [];
  for (var param in soundcloud.params) {
    if (soundcloud.params[param]) {
      paramsArray.push(encodeURIComponent(param) + '=' + encodeURIComponent(soundcloud.params[param]));
    }
  };
  player.params += paramsArray.join('&');

  player.audio = document.createElement('audio');
  player.tracks = [];
  player.index = 0;
  player.currentTime;
  player.duration;
  player.playing = false;
  player.paused = null;

  player.load = function(tracks) {
    this.tracks = tracks;
    this.index = 0;
    if (!this.paused) {
      this.paused = this.tracks[0];
    }
  };

  player.play = function(index) {
    if(index != null) this.index = index;
    if(!this.tracks[this.index]) return false;
    var track = this.tracks[this.index];
    if (this.audio.src != track.stream_url + this.params) {
      this.audio.src = track.stream_url + this.params;
    }
    this.audio.play();
    this.playing = track;
    this.paused = false;
  };

  player.pause = function() {
    this.audio.pause();
    this.paused = this.playing;
    this.playing = false;
  };

  player.playPause = function() {
    if (this.paused) {
      if (!this.audio.src) this.audio.src = this.paused.stream_url + this.params;
      this.audio.play();
      this.playing = this.paused;
      this.paused = false;
    } else if (this.audio.paused) {
      if (!this.audio.src) this.audio.src = this.tracks[this.index].stream_url + this.params;
      this.audio.play();
      this.playing = this.tracks[this.index];
      this.paused = false;
    } else {
      this.audio.pause();
      this.paused = this.playing;
      this.playing = false;
    }
  };

  player.next = function() {
    if (this.index < this.tracks.length - 1) {
      this.index++;
      this.play();
    }
  };

  player.previous = function() {
    if (this.index > 0) {
      this.index--;
      this.play();
    }
  };

  player.seek = function(e) {
    if (!this.audio.readyState) return false;
    var xpos = e.offsetX / e.target.offsetWidth;
    this.audio.currentTime = (xpos * this.audio.duration);
  };

  player.audio.addEventListener('ended', function() {
    player.next();
  }, false);

  return player;

});

