
var React = require('react');

var Tracks = React.createClass({

  renderTrack: function(track, i) {
    return (
      <div key={'track-'+i}>{track.user.username} - {track.title} ({track.type})</div>
    )
  },

  render: function() {
    return (
      <div className="">
        {this.props.tracks.map(this.renderTrack)}
      </div>
    )
  }

});

module.exports = Tracks;

