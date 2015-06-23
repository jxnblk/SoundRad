
import alt from '../alt'
import TracksFetcher from '../utils/TracksFetcher'

import PlayerActions from './PlayerActions'

class TrackActions {

  updateTracks(tracks) {
    this.dispatch(tracks)
  }

  fetchStream () {
    this.actions.updateTracks([])
    TracksFetcher.fetchStream()
      .then((tracks) => {
        this.actions.updateTracks(tracks)
      })
      .catch((errorMessage) => {
        this.actions.tracksFailed(errorMessage)
      })
  }

  fetchUserTracks (username) {
    this.actions.updateTracks([])
    TracksFetcher.fetchUserTracks(username)
      .then((tracks) => {
        this.actions.updateTracks(tracks)
      })
      .catch((errorMessage) => {
        this.actions.tracksFailed(errorMessage)
      })
  }

  tracksFailed (errorMessage) {
    this.dispatch(errorMessage)
  }

  previous () {
    this.dispatch()
  }

  next () {
    this.dispatch()
  }

  updateIndex(index) {
    this.dispatch(index)
  }

}

export default alt.createActions(TrackActions)

