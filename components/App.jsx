
var React = require('react');
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
      currentIndex: 0,
    }
  },

  connect: function() {
    window.location = 'https://soundcloud.com/connect?client_id=' + this.props.client_id + '&redirect_uri=' + this.props.callback_url + '&response_type=code_and_token&scope=non-expiring&display=popup'; 
  },

  setTracks: function(tracks) {
    this.setState({ tracks: tracks });
  },

  playPause: function(i) {
    if (typeof i === 'undefined') {
      i = this.state.currentIndex;
    }
    var track = this.state.tracks[i];
    var src = track.stream_url + '?client_id=' + this.props.client_id;
    var player = this.state.player;
    if (player) {
      player.playPause(src);
      this.setState({ currentIndex: i, playing: player.playing });
    }
  },

  componentDidMount: function() {
    //console.log('params', window.location.search);
    // Development hack
    if (this.props.token) {
      this.setState({ token: this.props.token });
    }
  },

  render: function() {
    return (
      <div className="container px2">
        <Controls
          {...this.props}
          {...this.state}
          playPause={this.playPause} />
        <Nav />
        <RouteHandler
          {...this.props}
          {...this.state}
          setTracks={this.setTracks} />

        <code>
          {this.state.token ? 'authed' : 'not authed'}
        </code>

        <button onClick={this.connect}
          className="button">
          Connect
        </button>
      </div>
    )
  }

});

module.exports = App;

