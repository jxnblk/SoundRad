
import data from '../data'
import token from './token'

export default function(url) {
  return [
    url,
    '?client_id=',
    data.client_id,
    '&oauth_token=',
    token
  ].join('')
}
