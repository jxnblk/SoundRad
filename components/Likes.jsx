
import React from 'react'
import Tracks from './Tracks.jsx'
import TrackActions from '../actions/TrackActions'

class Likes extends React.Component {

  componentDidMount () {
    TrackActions.fetchUserFavorites(this.props.params.user)
  }

  render () {
    return (
      <div className="">
        <Tracks {...this.props} />
      </div>
    )
  }

}

export default Likes

