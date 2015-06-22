
import React from 'react'

import UserStore from '../stores/UserStore'
import UserActions from '../actions/UserActions'

class CurrentUser extends React.Component {

  constructor () {
    super ()
    this.state = UserStore.getState()
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount () {
    UserStore.listen(this.onChange)
    UserActions.fetchUser()
  }

  componentWillUnmount () {
    UserStore.unlisten(this.onChange)
  }

  onChange(state) {
    this.setState(state);
  }

  render () {
    return (
      <div>
        {this.state.user.username}
      </div>
    )
  }

}

export default CurrentUser

