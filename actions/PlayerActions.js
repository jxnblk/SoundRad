
import alt from '../alt'
import player from '../utils/player'
import src from '../utils/src'

import TrackActions from './TrackActions'
import TrackStore from '../stores/TrackStore'

class PlayerActions {

  updatePlayer (player) {
    this.dispatch(player)
  }

  playPause (src) {
    player.playPause(src)
    this.actions.updatePlayer(player)
  }

  pause () {
    player.pause()
    this.actions.updatePlayer(player)
  }

  previous () {
    TrackActions.previous()
    let state = TrackStore.getState()
    let url = src(state.tracks[state.index].stream_url)
    this.actions.playPause(url)
  }

  next () {
    TrackActions.next()
    let state = TrackStore.getState()
    let url = src(state.tracks[state.index].stream_url)
    this.actions.playPause(url)
  }

  seek (e) {
    player.seek(e)
    this.actions.updatePlayer(player)
  }

}

export default alt.createActions(PlayerActions)

