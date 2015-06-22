
import alt from '../alt'
import PlayerActions from '../actions/PlayerActions'
import player from '../utils/player'

class PlayerStore {
  constructor () {
    this.player = player
    this.bindListeners({
      handleUpdatePlayer: PlayerActions.UPDATE_PLAYER
    })
    let self = this
    player.audio.addEventListener('timeupdate', function() {
      PlayerActions.updatePlayer(self.player)
    })
  }

  handleUpdatePlayer (player) {
    this.player = player
  }

}

export default alt.createStore(PlayerStore, 'PlayerStore')

