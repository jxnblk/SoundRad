
var React = require('react');
var superagent = require('superagent');
var Tracks = require('./Tracks.jsx');
var querystring = require('querystring');

var Stream = React.createClass({

  statics: {
    end: '/me/activities/tracks',
    endpoint: function() {
      return '/me/activities/tracks';
    }
  },

  getInitialState: function() {
    return {
      tracks: [],
      next_href: null,
    }
  },

  getTracks: function() {
    var self = this;
    var api = this.state.next_href || this.props.api + '/me/activities/tracks';
    var tracks = this.state.tracks;
    superagent
      .get(api)
      .query({
        client_id: this.props.client_id,
        oauth_token: this.props.token,
        limit: this.props.pageSize,
      })
      .end(function(err, response) {
        if (err) {
          console.error(err);
        } else {
          self.setState({
            tracks: tracks.concat(response.body.collection),
            next_href: response.body.next_href
          });
        }
      });
  },

  mapTrack: function(track) {
    var obj = track.origin;
    obj.type = track.type;
    obj.posted_at = track.created_at;
    return obj;
  },

  componentDidMount: function() {
    this.getTracks();
  },

  render: function() {
    var tracks = this.state.tracks.map(this.mapTrack);
    return (
      <div className="">
        <Tracks tracks={tracks} />
        <div className="center">
          <button onClick={this.getTracks}>
            Load More
          </button>
        </div>
      </div>
    )
  }

});

module.exports = Stream;

