
import React from 'react'
import Tracks from './Tracks.jsx'
import TrackActions from '../actions/TrackActions'

class Likes extends React.Component {

  constructor () {
    super ()
    this.getTracks = this.getTracks.bind(this)
  }

  getTracks () {
    TrackActions.fetchUserFavorites(this.props.params.user, this.props.page)
  }

  componentDidMount () {
    TrackActions.fetchUserFavorites(this.props.params.user)
  }

  componentWillUpdate (nextProps) {
    if (nextProps.page !== this.props.page) {
      this.getTracks()
    }
  }

  render () {
    return (
      <div>
        <Tracks {...this.props} />
      </div>
    )
  }

}

export default Likes

