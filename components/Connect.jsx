
import React from 'react'
import ConnectActions from '../actions/ConnectActions'

class LogIn extends React.Component {

  render() {
    let button
    let user = this.props.user
    if (this.props.token) {
      return (
        <div className='h5 flex flex-baseline p2'>
          <div className='flex-auto' />
          <span>Connected as {user.username}</span>
          <button onClick={ConnectActions.disconnect}
            className='btn'>
            Disconnect
          </button>
        </div>
      )
    } else {
      return (
        <div className='center px2 py4'>
          <button onClick={ConnectActions.connect}
            className='h3 btn'>
            Connect
          </button>
        </div>
      )
    }
  }

}

export default LogIn

