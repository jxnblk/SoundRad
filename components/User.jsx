
import React from 'react'
import superagent from 'superagent'
import { RouteHandler } from 'react-router'
import Tracks from './Tracks.jsx'
import TrackActions from '../actions/TrackActions'

class User extends React.Component {

  componentDidMount () {
    var username = this.props.params.user
    TrackActions.fetchUserTracks(username)
  }

  render () {
    return (
      <div>
        User
        <Tracks {...this.props} />
        <button onClick={this.loadMore}
          className="block col-12 py3 center button button-transparent">
          Load More
        </button>
      </div>
    )
  }

}

export default User;

