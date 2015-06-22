
import React from 'react'
import superagent from 'superagent'
import Tracks from './Tracks.jsx'
import querystring from 'querystring'

class Stream extends React.Component {

  constructor () {
    super ()
    //this.statics = {
    //  end: '/me/activities/tracks',
    //  endpoint: function() {
    //    return '/me/activities/tracks';
    //  }
    //}
    //this.state = {}
  }

  //getTracks: function() {
  //  var self = this;
  //  var api = this.state.next_href || this.props.api + '/me/activities/tracks';
  //  var tracks = this.props.tracks;
  //  superagent
  //    .get(api)
  //    .query({
  //      client_id: this.props.client_id,
  //      oauth_token: this.props.token,
  //      limit: this.props.pageSize,
  //    })
  //    .end(function(err, response) {
  //      if (err) {
  //        console.error(err);
  //      } else {
  //        var newTracks = response.body.collection.map(self.mapTrack);
  //        self.props.setTracks(tracks.concat(newTracks));
  //        self.setState({ next_href: response.body.next_href });
  //      }
  //    });
  //},

  mapTrack (track) {
    var obj = track.origin;
    obj.type = track.type || null;
    obj.posted_at = track.created_at;
    return obj;
  }

  componentDidMount () {
    //this.getTracks();
  }

  render () {
    return (
      <div className="">
        {/*
        <Tracks
          {...this.props}
          tracks={this.props.tracks} />
        */}
        <div className="">
          <button onClick={this.getTracks}
            className="block col-12 py3 center button button-transparent">
            Load More
          </button>
        </div>
      </div>
    )
  }

}

export default Stream

