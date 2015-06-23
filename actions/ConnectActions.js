
import alt from '../alt'
import qs from 'qs'
import data from '../data'
import { HistoryLocation } from 'react-router'

class ConnectActions {

  connect () {
    console.log('ConnectActions.connect()')
    console.log('HistoryLocation', HistoryLocation)
    let params = qs.stringify({
      client_id: data.client_id,
      redirect_uri: data.callback_url,
      response_type: 'code_and_token',
      scope: 'non-expiring',
      display: 'popup'
    })
    let href = 'https://soundcloud.com/connect?' + params
    //window.location.href = href
  }

  disconnect () {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

}

export default alt.createActions(ConnectActions)
