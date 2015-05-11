
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
      playing: false,
    }
  },

  connect: function() {
    window.location = 'https://soundcloud.com/connect?client_id=' + this.props.client_id + '&redirect_uri=' + this.props.callback_url + '&response_type=code_and_token&scope=non-expiring&display=popup'; 
  },

  componentDidMount: function() {
    console.log('params', window.location.search);
    if (this.props.token) {
      this.setState({ token: this.props.token });
    }
  },

  render: function() {
    return (
      <div className="container px2">
        <Controls {...this.props} {...this.state} />
        <Nav />
        <RouteHandler {...this.props} {...this.state} />

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

