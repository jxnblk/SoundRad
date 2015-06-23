
import alt from '../alt'
import TrackActions from '../actions/TrackActions'
import src from '../utils/src'

class TrackStore {

  constructor () {
    this.tracks = []
    this.nextHref = false
    this.playlists = []
    this.index = 0
    this.errorMessage = null
    this.bindListeners({
      handleUpdateTracks: TrackActions.UPDATE_TRACKS,
      handleConcatTracks: TrackActions.CONCAT_TRACKS,
      handleUpdateNextHref: TrackActions.UPDATE_NEXT_HREF,
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

  handleConcatTracks (tracks) {
    this.tracks = this.tracks.concat(tracks)
  }

  handleUpdateNextHref (nextHref) {
    this.nextHref = nextHref
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
    this.errorMessage = errorMessage
  }

  handlePrevious () {
    if (this.index > 0) {
      this.index--
    }
  }

  handleNext () {
    if (this.index < this.tracks.length - 1) {
      this.index++
    }
  }

}

export default alt.createStore(TrackStore, 'TrackStore')

