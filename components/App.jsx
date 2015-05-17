
var React = require('react');
var superagent = require('superagent');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Player = require('audio-player');

var Controls = require('./Controls.jsx');
var Nav = require('./Nav.jsx');


var App = React.createClass({

  getInitialState: function() {
    return {
      token: this.props.token,
      player: new Player(),
      tracks: [],
      playing: false,
      index: 0,
      duration: 0,
      currentTime: 0,
      currentUser: false,
    }
  },

  src: function() {
    var track = this.state.tracks[this.state.index];
    var src = track.stream_url + '?client_id=' + this.props.client_id;
    return src;
  },

  connect: function() {
    window.location = 'https://soundcloud.com/connect?client_id=' + this.props.client_id + '&redirect_uri=' + this.props.callback_url + '&response_type=code_and_token&scope=non-expiring&display=popup'; 
  },

  getCurrentUser: function() {
    var self = this;
    var api = this.props.api + '/me';
    superagent
      .get(api)
      .query({
        client_id: this.props.client_id,
        oauth_token: this.state.token
      })
      .end(function(err, response) {
        if (err) {
          console.error(err);
        }
        var user = JSON.parse(response.text);
        console.log(user);
        self.setState({ currentUser: user });
      });
  },

  setTracks: function(tracks) {
    this.setState({ tracks: tracks });
  },

  playPause: function(i) {
    if (typeof i !== 'number') {
      i = this.state.index;
    }
    var track = this.state.tracks[i];
    var src = track.stream_url + '?client_id=' + this.props.client_id;
    var player = this.state.player;
    if (player) {
      player.playPause(src);
      this.setState({ index: i, playing: player.playing });
    }
  },

  previous: function() {
    var i = this.state.index;
    var player = this.state.player;
    if (i > 0) {
      i--;
      this.setState({ index: i }, function() {
        player.play(this.src());
      });
    } else {
      player.audio.currentTime = 0;
    }
  },

  next: function() {
    var i = this.state.index;
    var tracks = this.state.tracks;
    var player = this.state.player;
    if (i < tracks.length - 1) {
      i++;
      this.setState({ index: i }, function() {
        player.play(this.src());
      });
    } else {
      player.pause();
    }
  },

  seek: function(e) {
    var player = this.state.player;
    e.offsetX = e.clientX - e.target.offsetLeft;
    player.seek(e);
  },

  componentDidMount: function() {
    var self = this;
    //console.log('params', window.location.search);
    // Development hack
    if (this.props.token) {
      this.setState({ token: this.props.token }, function() {
        self.getCurrentUser();
      });
    }
    var player = this.state.player;
    player.audio.addEventListener('timeupdate', function() {
      self.setState({
        currentTime: player.audio.currentTime,
        duration: player.audio.duration
      });
    });
    player.audio.addEventListener('ended', function() {
      self.next();
    });
  },

  render: function() {
    return (
      <div className="container px2">
        <Nav {...this.props} {...this.state} />
        <Controls
          {...this.props}
          {...this.state}
          playPause={this.playPause}
          previous={this.previous}
          next={this.next}
          seek={this.seek} />
        <RouteHandler
          {...this.props}
          {...this.state}
          playPause={this.playPause}
          setTracks={this.setTracks} />

        <div className="p4">
          <code>
            {this.state.token ? 'authed' : 'not authed'}
          </code>
          <button onClick={this.connect}
            className="button">
            Connect
          </button>
        </div>
      </div>
    )
  }

});

module.exports = App;

