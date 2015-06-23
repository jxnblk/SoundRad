
import alt from '../alt'
import soundcloud from '../utils/soundcloud'
import PageStore from '../stores/PageStore'

class TrackActions {

  updateTracks(tracks) {
    this.dispatch(tracks)
  }

  concatTracks(tracks) {
    this.dispatch(tracks)
  }

  updateNextHref(nextHref) {
    this.dispatch(nextHref)
  }

  updatePlaylists(playlists) {
    this.dispatch(playlists)
  }

  updateIndex(index) {
    this.dispatch(index)
  }

  fetchStream (nextHref) {
    if (!nextHref) {
      this.actions.updateTracks([])
    }
    soundcloud.fetchStream(nextHref)
      .then((res) => {
        if (!nextHref) {
          this.actions.updateTracks(res.tracks)
        } else {
          this.actions.concatTracks(res.tracks)
        }
        this.actions.updateNextHref(res.nextHref)
      })
      .catch((errorMessage) => {
        this.actions.tracksFailed(errorMessage)
      })
  }

  fetchUserTracks (username) {
    let page = PageStore.getState().page
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
    let page = PageStore.getState().page
    this.actions.updateTracks([])
    soundcloud.fetchUserFavorites(username, page)
      .then((tracks) => {
        this.actions.updateTracks(tracks)
      })
      .catch((errorMessage) => {
        this.actions.tracksFailed(errorMessage)
      })
  }

  fetchUserPlaylists (username) {
    let page = PageStore.getState().page
    this.actions.updatePlaylists([])
    soundcloud.fetchUserPlaylists(username, page)
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

