
import React from 'react'
import superagent from 'superagent'
import Tracks from './Tracks.jsx'
import querystring from 'querystring'
import TrackActions from '../actions/TrackActions'

class Stream extends React.Component {

  constructor () {
    super ()
    this.loadMore = this.loadMore.bind(this)
  }

  componentDidMount () {
    if (this.props.token) {
      TrackActions.fetchStream()
    }
  }

  loadMore () {
    let href = this.props.nextHref
    TrackActions.fetchStream(href)
  }

  render () {
    return (
      <div>
        <Tracks {...this.props}
          tracks={this.props.tracks} />
        <div>
          <button onClick={this.loadMore}
            className='btn py2 mt2 block col-12'>
            Load More
          </button>
        </div>
      </div>
    )
  }

}

export default Stream

