
import alt from '../alt'
import player from '../utils/player'
import src from '../utils/src'

import TrackActions from './TrackActions'
import TrackStore from '../stores/TrackStore'

class PlayerActions {

  updatePlayer (player) {
    this.dispatch(player)
  }

  playPause (stream_url) {
    let url = src(stream_url)
    player.playPause(url)
    this.actions.updatePlayer(player)
  }

  pause () {
    player.pause()
    this.actions.updatePlayer(player)
  }

  previous () {
    TrackActions.previous()
    let state = TrackStore.getState()
    this.actions.playPause(state.tracks[state.index].stream_url)
  }

  next () {
    TrackActions.next()
    let state = TrackStore.getState()
    this.actions.playPause(state.tracks[state.index].stream_url)
  }

  playIndex (index) {
    TrackActions.updateIndex(index)
    let state = TrackStore.getState()
    this.actions.playPause(state.tracks[state.index].stream_url)
  }

  seek (e) {
    e.offsetX = e.clientX - e.target.offsetLeft
    player.seek(e)
    this.actions.updatePlayer(player)
  }

}

export default alt.createActions(PlayerActions)

