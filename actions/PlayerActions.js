
import alt from '../alt'
import player from '../utils/player'
import src from '../utils/src'

import TrackActions from './TrackActions'
import TrackStore from '../stores/TrackStore'

class PlayerActions {

  updatePlayer (player) {
    this.dispatch(player)
  }

  updateTrack (track) {
    this.dispatch(track)
  }

  playPause (track) {
    let url = src(track.stream_url)
    player.playPause(url)
    this.actions.updateTrack(track)
    this.actions.updatePlayer(player)
  }

  pause () {
    player.pause()
    this.actions.updatePlayer(player)
  }

  previous () {
    TrackActions.previous()
    let state = TrackStore.getState()
    this.actions.updateTrack(state.tracks[state.index])
    this.actions.playPause(state.tracks[state.index].stream_url)
  }

  next () {
    TrackActions.next()
    let state = TrackStore.getState()
    this.actions.updateTrack(state.tracks[state.index])
    this.actions.playPause(state.tracks[state.index])
  }

  playIndex (index) {
    TrackActions.updateIndex(index)
    let state = TrackStore.getState()
    this.actions.updateTrack(state.tracks[state.index])
    this.actions.playPause(state.tracks[state.index])
  }

  seek (e) {
    e.offsetX = e.clientX - e.target.offsetLeft
    player.seek(e)
    this.actions.updatePlayer(player)
  }

}

export default alt.createActions(PlayerActions)

