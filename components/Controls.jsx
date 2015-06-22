
import React from 'react'
import hhmmss from 'hhmmss'
import Icon from 'react-geomicons'
import data from '../data'
import src from '../utils/src'
import Progress from './Progress.jsx'

import PlayerActions from '../actions/PlayerActions'
import TrackActions from '../actions/TrackActions'

class Controls extends React.Component {

  constructor () {
    super ()
    this.playPause = this.playPause.bind(this)
  }

  playPause () {
    let stream_url = this.props.tracks[this.props.index].stream_url
    PlayerActions.playPause(stream_url)
  }

  render () {
    var track = this.props.tracks[this.props.index];
    var title;
    var username;
    if (track) {
      title = track.title;
      username = track.user.username;
    }
    let player = this.props.player
    let audio = player.audio
    var progress = (audio.duration * audio.currentTime / audio.duration) || 0;

    return (
      <div>
        <div className="flex flex-center py2 mxn1">
          <div className="nowrap px1">
            <button
              onClick={PlayerActions.previous}
              className="h3 button-narrow button-transparent">
              <Icon name="previous" />
            </button>
            <button
              onClick={this.playPause}
              className="h2 button-narrow button-transparent">
              <Icon name={this.props.player.playing ? 'pause' : 'play'} />
            </button>
            <button
              onClick={PlayerActions.next}
              className="h3 button-narrow button-transparent">
              <Icon name="next" />
            </button>
          </div>
          <div className="flex-auto px1">
            <h1 className="h5 m0">{username}</h1>
            <h1 className="h4 m0">{title}</h1>
          </div>
          <div className="h6 bold nowrap p1">
            <span>{hhmmss(audio.currentTime)}</span>
            <span> | </span>
            <span>{hhmmss(audio.duration)}</span>
          </div>
        </div>
        <Progress
          onClick={PlayerActions.seek}
          value={progress}
          max={audio.duration || 1}
          min={0} />
      </div>
    )
  }

}

export default Controls

