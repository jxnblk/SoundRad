
import React from 'react'
import Tracks from './Tracks.jsx'
import TrackActions from '../actions/TrackActions'
import { Link } from 'react-router'

class User extends React.Component {

  constructor () {
    super ()
    this.state = {
      page: 0
    }
    this.nextPage = this.nextPage.bind(this)
    this.getTracks = this.getTracks.bind(this)
  }

  getTracks () {
    let q = this.props.query
    let page = 1
    if (q && q.page) {
      page = parseInt(q.page, 10)
      this.setState({ page: page })
    }
    TrackActions.fetchUserTracks(this.props.params.user, page)
  }

  componentDidMount () {
    this.getTracks()
  }

  nextPage () {
    let page = this.state.page
    page++
    this.setState({ page: page })
    this.getTracks()
  }

  render () {
    return (
      <div>
        <Tracks {...this.props} />
        <Link to='user'
          onClick={this.nextPage}
          params={{ user: this.props.params.user }}
          query={{ page: this.state.page + 1 }}>
          Next page
        </Link>
        {/*
        <button onClick={this.props.loadMore}
          className="block col-12 py3 center button button-transparent">
          Load More
        </button>
        */}
      </div>
    )
  }

}

export default User;

