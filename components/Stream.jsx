
import React from 'react'
import superagent from 'superagent'
import Tracks from './Tracks.jsx'
import querystring from 'querystring'
import TrackActions from '../actions/TrackActions'

class Stream extends React.Component {

  componentDidMount () {
    TrackActions.fetchStream()
  }

  render () {
    return (
      <div>
        <Tracks {...this.props}
          tracks={this.props.tracks} />
        <div>
          <button onClick={this.getTracks}
            className="block col-12 py3 center button button-transparent">
            Load More
          </button>
        </div>
      </div>
    )
  }

}

export default Stream

