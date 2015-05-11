
var React = require('react');
var Player = require('./Player.jsx');

var App = React.createClass({

  render: function() {
    return (
      <div className="container px2">
        <Player />
        <h1>App</h1>
        <button className="button">
          button
        </button>
      </div>
    )
  }

});

module.exports = App;

