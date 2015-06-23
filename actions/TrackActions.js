
import alt from '../alt'
import soundcloud from '../utils/soundcloud'

class TrackActions {

  updateTracks(tracks) {
    this.dispatch(tracks)
  }

  updatePlaylists(playlists) {
    this.dispatch(playlists)
  }

  updateIndex(index) {
    this.dispatch(index)
  }

  updatePage(page) {
    this.dispatch(page)
  }

  fetchStream () {
    this.actions.updateTracks([])
    soundcloud.fetchStream()
      .then((tracks) => {
        this.actions.updateTracks(tracks)
      })
      .catch((errorMessage) => {
        this.actions.tracksFailed(errorMessage)
      })
  }

  fetchUserTracks (username, page) {
    this.actions.updateTracks([])
    soundcloud.fetchUserTracks(username, page)
      .then((tracks) => {
        this.actions.updateTracks(tracks)
      })
      .catch((errorMessage) => {
        this.actions.tracksFailed(errorMessage)
      })
  }

  fetchUserFavorites (username) {
    this.actions.updateTracks([])
    soundcloud.fetchUserFavorites(username)
      .then((tracks) => {
        this.actions.updateTracks(tracks)
      })
      .catch((errorMessage) => {
        this.actions.tracksFailed(errorMessage)
      })
  }

  fetchUserPlaylists (username) {
    this.actions.updatePlaylists([])
    soundcloud.fetchUserPlaylists(username)
      .then((playlists) => {
        this.actions.updatePlaylists(playlists)
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

}

export default alt.createActions(TrackActions)

