
import React from 'react'
import Tracks from './Tracks.jsx'
import TrackActions from '../actions/TrackActions'
import Pagination from './Pagination.jsx'
import Loading from './Loading.jsx'

class Likes extends React.Component {

  constructor () {
    super ()
    this.getTracks = this.getTracks.bind(this)
  }

  getTracks (user) {
    TrackActions.fetchUserFavorites(user, this.props.page)
  }

  componentDidMount () {
    this.getTracks(this.props.params.user)
  }

  componentWillUpdate (nextProps) {
    if (nextProps.page !== this.props.page || nextProps.params !== this.props.params) {
      this.getTracks(nextProps.params.user)
    }
  }

  render () {
    return (
      <div>
        {this.props.tracks.length ? false : <Loading />}
        <Tracks {...this.props} />
        <Pagination {...this.props} />
      </div>
    )
  }

}

export default Likes

