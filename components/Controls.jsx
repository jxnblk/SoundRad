
var React = require('react');
var hhmmss = require('hhmmss');
var Icon = require('react-geomicons');
var Progress = require('./Progress.jsx');

var Player = React.createClass({

  render: function() {
    var track = this.props.tracks[this.props.index];
    var title;
    var username;
    if (track) {
      title = track.title;
      username = track.user.username;
    }
    var progress = (this.props.duration * this.props.currentTime / this.props.duration) || 0;

    return (
      <div>
        <div className="flex flex-center py2 mxn1">
          <div className="nowrap px1">
            <button
              onClick={this.props.previous}
              className="h3 button-narrow button-transparent">
              <Icon name="previous" />
            </button>
            <button
              onClick={this.props.playPause}
              className="h2 button-narrow button-transparent">
              <Icon name={this.props.playing ? 'pause' : 'play'} />
            </button>
            <button
              onClick={this.props.next}
              className="h3 button-narrow button-transparent">
              <Icon name="next" />
            </button>
          </div>
          <div className="flex-auto px1">
            <h1 className="h5 m0">{username}</h1>
            <h1 className="h4 m0">{title}</h1>
          </div>
          <div className="h6 bold nowrap p1">
            <span>{hhmmss(this.props.currentTime)}</span>
            <span> | </span>
            <span>{hhmmss(this.props.duration)}</span>
          </div>
        </div>
        <Progress
          onClick={this.props.seek}
          value={progress}
          max={this.props.duration || 1}
          min={0} />
      </div>
    )
  }

});

module.exports = Player;

