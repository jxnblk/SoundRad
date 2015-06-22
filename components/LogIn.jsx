
import React from 'react'
import ConnectActions from '../actions/ConnectActions'

class LogIn extends React.Component {

  render() {

    return (
      <div>
        <button onClick={ConnectActions.connect}>
          Connect
        </button>
        <button onClick={ConnectActions.disconnect}>
          Disconnect
        </button>
      </div>
    )
  }

}

export default LogIn

