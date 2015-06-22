
import alt from '../alt'
import TrackActions from '../actions/TrackActions'

class TrackStore {

  constructor () {
    this.tracks = []
    this.bindListeners({
      handleUpdateTracks: TrackActions.UPDATE_TRACKS
    })
  }

  handleUpdateTracks(tracks) {
    this.tracks = tracks
  }

}

export default alt.createStore(TrackStore, 'TrackStore')

