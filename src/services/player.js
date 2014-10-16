
app.factory('player', function(soundcloud) {

  var player = {};
  player.params = '?';

  var paramsArray = [];
  for (var param in soundcloud.params) {
    paramsArray.push(encodeURIComponent(param) + '=' + encodeURIComponent(soundcloud.params[param]));
  };
  player.params += paramsArray.join('&');

  player.audio = document.createElement('audio');
  player.tracks = [];
  player.index = 0;
  // Consider using audio.paused instead
  //player.playing = false;

  player.load = function(tracks) {
    this.tracks = tracks;
  };

  player.play = function(index) {
    if(index) this.index = index;
    if(!this.tracks[this.index]) return false;
    this.audio.src = this.tracks[this.index].origin.stream_url + this.params;
    this.audio.play();
  };

  player.pause = function() {
    this.audio.pause();
  };

  player.playPause = function() {
    if (this.audio.paused) {
      if (!this.audio.src) this.audio.src = this.tracks[this.index].stream_url + this.params;
      this.audio.play();
    } else {
      this.audio.pause();
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

  player.audio.addEventListener('ended', function() {
    player.next();
  }, false);

  return player;

});

