
var React = require('react');
var Icon = require('react-geomicons');

var Player = React.createClass({

  handlePlayPauseClick: function(e) {
    this.props.playPause();
  },

  render: function() {
    return (
      <div>
        <button className="h3 button-transparent">
          <Icon name="previous" />
        </button>
        <button
          onClick={this.handlePlayPauseClick}
          className="h2 button-transparent">
          <Icon name="play" />
          <Icon name="pause" />
        </button>
        <button className="h3 button-transparent">
          <Icon name="next" />
        </button>
      </div>
    )
  }

});

module.exports = Player;

