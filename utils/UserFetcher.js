
import superagent from 'superagent'
import data from '../data'
import token from './token'

let endpoint = '/me'

let params = {
  oauth_token: token,
  client_id: data.client_id
}

let UserFetcher = {
  fetch () {
    return new Promise(function(resolve, reject) {
      if (!token) {
        reject('Not connected')
      }
      superagent
        .get(data.api + endpoint)
        .query(params)
        .end(function(err, res) {
          if (err) {
            reject(err)
          }
          let user = JSON.parse(res.text)
          console.log('res', user)
          resolve(user)
        })
    })
  }
}

export default UserFetcher

