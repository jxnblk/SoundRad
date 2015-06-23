
var React = require('react');
var Track = require('./Track.jsx');

var Tracks = React.createClass({

  renderTrack: function(track, i) {
    return (
      <Track key={'track-'+i}
        {...this.props}
        track={track}
        i={i} />
    )
  },

  render: function() {
    return (
      <div>
        {this.props.tracks.map(this.renderTrack)}
      </div>
    )
  }

});

module.exports = Tracks;

