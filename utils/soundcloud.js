
import superagent from 'superagent'
import data from '../data'
import token from './token'

const params = {
  oauth_token: token,
  client_id: data.client_id,
  limit: data.pageSize
}

let soundcloud = {

  fetchStream () {
    return new Promise(function(resolve, reject) {
      let endpoint = '/me/activities/tracks'
      function mapStreamTrack (track) {
        let obj = track.origin;
        obj.type = track.type || null;
        obj.posted_at = track.created_at;
        return obj;
      }
      superagent
        .get(data.api + endpoint)
        .query(params)
        .end(function(err, res) {
          if (err) {
            reject(err)
          }
          let response = JSON.parse(res.text)
          let tracks = response.collection.map(mapStreamTrack)
          console.log('future_href', response.future_href)
          resolve(tracks)
        })
    })
  },

  fetchUser (username) {
    return new Promise(function(resolve, reject) {
      let endpoint = '/users/' + username
      superagent
        .get(data.api + endpoint)
        .query(params)
        .end(function(err, res) {
          if (err) {
            reject(err)
          }
          let user = JSON.parse(res.text)
          resolve(user)
        })
    })
  },

  fetchUserTracks (username, page) {
    return new Promise(function(resolve, reject) {
      let endpoint = '/users/' + username + '/tracks'
      let offset = 0
      if (page) {
        offset = data.pageSize * (page - 1)
      }
      superagent
        .get(data.api + endpoint)
        .query(params)
        .query({ offset: offset })
        .end(function(err, res) {
          if (err) {
            reject(err)
          }
          let tracks = JSON.parse(res.text)
          resolve(tracks)
        })
    })
  },

  fetchUserFavorites (username) {
    return new Promise(function(resolve, reject) {
      let endpoint = '/users/' + username + '/favorites'
      superagent
        .get(data.api + endpoint)
        .query(params)
        .end(function(err, res) {
          if (err) {
            reject(err)
          }
          let tracks = JSON.parse(res.text)
          resolve(tracks)
        })
    })
  },

  fetchUserPlaylists (username) {
    return new Promise(function(resolve, reject) {
      let endpoint = '/users/' + username + '/playlists'
      superagent
        .get(data.api + endpoint)
        .query(params)
        .end(function(err, res) {
          if (err) {
            reject(err)
          }
          let playlists = JSON.parse(res.text)
          console.log(playlists)
          resolve(playlists)
        })
    })
  }

}

export default soundcloud

