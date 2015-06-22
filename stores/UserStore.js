
import alt from '../alt'
import UserActions from '../actions/UserActions'

class UserStore {
  constructor () {
    this.user = {}
    this.errorMessage = null
    this.bindListeners({
      handleUpdateUser: UserActions.UPDATE_USER,
      handleFetchUser: UserActions.FETCH_USER,
      handleUserFailed: UserActions.USER_FAILED
    })
  }

  handleUpdateUser(user) {
    this.user = user
  }

  handleFetchUser() {
    this.user = {}
  }

  handleUserFailed(errorMessage) {
    this.errorMessage = errorMessage
  }
}

export default alt.createStore(UserStore, 'UserStore')

