
import React from 'react'
import Tracks from './Tracks.jsx'
import { Link } from 'react-router'
import TrackActions from '../actions/TrackActions'
import TrackStore from '../stores/TrackStore'

class User extends React.Component {

  constructor () {
    super ()
    this.getTracks = this.getTracks.bind(this)
  }

  getTracks () {
    console.log('page', this.props.page)
    TrackActions.fetchUserTracks(this.props.params.user, this.props.page)
  }

  componentDidMount () {
    this.getTracks()
  }

  //componentWillReceiveProps (nextProps) {
  componentWillUpdate (nextProps) {
    if (nextProps.page !== this.props.page) {
      this.getTracks()
    }
  }

  render () {
    console.log('User render', this.props.page)
    return (
      <div>
        <Tracks {...this.props} />
      </div>
    )
  }

}

User.propTypes = {
  page: React.PropTypes.number
}

export default User;

