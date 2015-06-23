
import alt from '../alt'
import PlayerActions from '../actions/PlayerActions'
import player from '../utils/player'

class PlayerStore {
  constructor () {
    this.player = player
    this.track = false
    this.bindListeners({
      handleUpdatePlayer: PlayerActions.UPDATE_PLAYER,
      handleUpdateTrack: PlayerActions.UPDATE_TRACK
    })
    let self = this
    player.audio.addEventListener('timeupdate', function() {
      PlayerActions.updatePlayer(self.player)
    })
    player.audio.addEventListener('ended', function() {
      PlayerActions.next()
    })
  }

  handleUpdatePlayer (player) {
    this.player = player
  }

  handleUpdateTrack (track) {
    this.track = track
  }

}

export default alt.createStore(PlayerStore, 'PlayerStore')

