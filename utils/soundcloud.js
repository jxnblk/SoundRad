
import superagent from 'superagent'
import data from '../data'
import token from './token'

const params = {
  oauth_token: token,
  client_id: data.client_id,
  limit: data.pageSize
}

let soundcloud = {

  fetchStream (nextHref) {
    return new Promise(function(resolve, reject) {
      let api = nextHref ? nextHref : data.api + '/me/activities/tracks'
      function mapStreamTrack (track) {
        let obj = track.origin;
        obj.type = track.type || null;
        obj.posted_at = track.created_at;
        return obj;
      }
      superagent
        .get(api)
        .query(params)
        .end(function(err, res) {
          if (err) {
            reject(err)
          }
          let response = JSON.parse(res.text)
          let tracks = response.collection.map(mapStreamTrack)
          let nextHref = response.next_href
          resolve({ tracks: tracks, nextHref: nextHref })
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

  getOffset(page) {
    if (page) {
      return (page - 1) * data.pageSize
    } else {
      return 0
    }
  },

  fetchUserTracks (username, page) {
    let self = this
    return new Promise(function(resolve, reject) {
      let endpoint = '/users/' + username + '/tracks'
      let offset = self.getOffset(page)
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

  fetchUserFavorites (username, page) {
    let self = this
    return new Promise(function(resolve, reject) {
      let endpoint = '/users/' + username + '/favorites'
      let offset = self.getOffset(page)
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

  fetchUserPlaylists (username) {
    let self = this
    return new Promise(function(resolve, reject) {
      let endpoint = '/users/' + username + '/playlists'
      let offset = self.getOffset(page)
      superagent
        .get(data.api + endpoint)
        .query(params)
        .query({ offset: offset })
        .end(function(err, res) {
          if (err) {
            reject(err)
          }
          let playlists = JSON.parse(res.text)
          resolve(playlists)
        })
    })
  }

}

export default soundcloud

