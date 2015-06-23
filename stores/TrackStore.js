
import alt from '../alt'
import TrackActions from '../actions/TrackActions'
import src from '../utils/src'

class TrackStore {

  constructor () {
    this.tracks = []
    this.playlists = []
    this.index = 0
    this.errorMessage = null
    this.bindListeners({
      handleUpdateTracks: TrackActions.UPDATE_TRACKS,
      handleUpdatePlaylists: TrackActions.UPDATE_PLAYLISTS,
      handleUpdateIndex: TrackActions.UPDATE_INDEX,
      handleFetchStream: TrackActions.FETCH_STREAM,
      handleFetchUserTracks: TrackActions.FETCH_USER_TRACKS,
      handleFetchUserFavorites: TrackActions.FETCH_USER_FAVORITES,
      handleTracksFailed: TrackActions.TRACKS_FAILED,
      handlePrevious: TrackActions.PREVIOUS,
      handleNext: TrackActions.NEXT
    })
  }

  handleUpdateTracks (tracks) {
    this.tracks = tracks
  }

  handleUpdatePlaylists (playlists) {
    this.playlists = playlists
  }

  handleUpdateIndex (index) {
    this.index = index
  }

  handleFetchStream () {
    this.tracks = []
  }

  handleFetchUserTracks () {
    this.tracks = []
  }

  handleFetchUserFavorites () {
    this.tracks = []
  }

  handleTracksFailed (errorMessage) {
    this.dispatch(errorMessage)
  }

  handlePrevious () {
    if (this.index > 0) {
      this.index--
    } else {
      //PlayerActions.pause()
    }
  }

  handleNext () {
    if (this.index < this.tracks.length - 1) {
      this.index++
    } else {
      //PlayerActions.pause()
    }
  }

}

export default alt.createStore(TrackStore, 'TrackStore')

