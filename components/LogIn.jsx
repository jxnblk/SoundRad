
import React from 'react'
import qs from 'qs'

class LogIn extends React.Component {

  render() {
    let params = qs.stringify({
      client_id: this.props.client_id,
      redirect_uri: this.props.callback_url,
      response_type: 'code_and_token',
      scope: 'non-expiring',
      display: 'popup'
    })
    let href = 'https://soundcloud.com/connect?' + params
    return (
      <a href={href}>
        Connect
      </a>
    )
  }

}

export default LogIn

