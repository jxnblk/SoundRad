
import alt from '../alt'

class TrackActions {
  updateTracks(tracks) {
    this.dispatch(tracks)
  }
}

export default alt.createActions(TrackActions)

