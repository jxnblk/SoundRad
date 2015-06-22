
import _ from 'lodash'
import superagent from 'superagent'
import data from '../data'

let endpoint = '/me/activities/tracks'

let UserFetcher = {
  fetch (params) {
    var params = _.assign(params, {
      token: data.token,
      client_id: data.client_id
    })
    console.log('params', params)
    return new Promise(function(resolve, reject) {
      superagent
        .get(data.api + endpoint)
        .query(params)
        .end(function(err, res) {
          if (err) {
            reject(err)
          }
          resolve(res)
        })
    })
  }
}

export default UserFetcher

