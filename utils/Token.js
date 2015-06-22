
import qs from 'qs'

function getToken() {
  let token = localStorage.getItem('token')
  let hash = window.location.hash

  if (token) {
    console.log('token from storage')
    return token
  } else if (hash) {
    let params = qs.parse(hash.replace(/^\#/, ''))
    if (params.access_token) {
      console.log('token from params')
      localStorage.setItem('token', params.access_token)
      window.location.hash = ''
      //window.location.search = ''
      return params.access_token
    }
  } else {
    return false
  }
}

export default getToken()

