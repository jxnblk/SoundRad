
import alt from '../alt'
import UserFetcher from '../utils/UserFetcher'

class UserActions {
  updateUser (user) {
    this.dispatch(user)
  }

  fetchUser () {
    UserFetcher.fetch({})
      .then((user) => {
        this.actions.updateUser(user)
      })
      .catch((errorMessage) => {
        this.actions.userFailed(errorMessage)
      })
  }

  userFailed (errorMessage) {
    this.dispatch(errorMessage)
  }
}

export default alt.createActions(UserActions)

