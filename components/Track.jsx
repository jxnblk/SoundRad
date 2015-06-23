
import React from 'react'
import Icon from 'react-geomicons'
import PlayerActions from '../actions/PlayerActions'

class Track extends React.Component {

  render () {
    var self = this
    var track = this.props.track
    var i = this.props.i
    var active = i === this.props.index && track.id === this.props.tracks[this.props.index].id
    var classNames = {
      container: [
        'flex',
        (active ? 'white bg-black' : '')
      ].join(' '),
      button: [
        'left-align',
        'block',
        'flex-auto',
        'button',
        'button-transparent',
      ].join(' '),
    }
    var handleClick = function(e) {
      PlayerActions.playIndex(i)
      //self.props.playPause(i)
    }
    var icon = false
    if (track.type === 'track-repost') {
      icon = (
        <span className="h6 caps nowrap flex flex-center px1 muted">
          <Icon name="repost" className="h4 mr1" />
        </span>
      )
    }

    return (
      <div key={i} className={classNames.container}>
        <button 
          onClick={handleClick}
          className={classNames.button}>
          <span className="flex flex-center mxn1">
            <span className="flex-auto px1">
              {track.user.username} - {track.title}
            </span>
            {icon}
          </span>
        </button>
        {/*
        <button className="h4 button button-transparent">
          <Icon name="heart" className="icon" />
        </button>
        <button className="h4 button button-transparent">
          <Icon name="chevronRight" className="icon" />
        </button>
        */}
      </div>
    )
  }

}

export default Track
