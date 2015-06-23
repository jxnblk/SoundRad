
import React from 'react'
import TrackActions from '../actions/TrackActions'

class Playlists extends React.Component {

  componentDidMount () {
    TrackActions.fetchUserPlaylists(this.props.params.user)
  }

  render () {
    return (
      <div>
        {this.props.playlists.length} playlists
        {this.props.playlists.map(function(playlist, i) {
          return (
            <div key={i}>
              {playlist.title}
            </div>
          )
        })}
      </div>
    )
  }

}

export default Playlists

