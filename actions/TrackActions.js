
import alt from '../alt'
import TracksFetcher from '../utils/TracksFetcher'

import PlayerActions from './PlayerActions'

class TrackActions {

  updateTracks(tracks) {
    this.dispatch(tracks)
  }

  fetchStream () {
    TracksFetcher.fetchStream()
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

