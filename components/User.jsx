
var React = require('react');
var superagent = require('superagent');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Tracks = require('./Tracks.jsx');

var User = React.createClass({

  getInitialState: function() {
    return {
      page: 0,
    }
  },

  getTracks: function() {
    var self = this;
    var tracks = this.props.tracks;
    console.log(tracks.length);
    var api = this.props.api + '/users/' + this.props.params.user + '/tracks';
    superagent
      .get(api)
      .query({
        client_id: this.props.client_id,
        oauth_token: this.props.token,
        offset: this.props.pageSize * this.state.page,
      })
      .end(function(err, response) {
        if (err) {
          console.error(err);
        }
        var newTracks = JSON.parse(response.text);
        if (self.state.page > 0) {
          newTracks = tracks.concat(newTracks);
        }
        self.props.setTracks(newTracks);
      });
  },

  loadMore: function() {
    var self = this;
    var page = this.state.page;
    page++;
    this.setState({ page: page }, function() {
      self.getTracks();
    });
  },

  componentDidMount: function() {
    this.props.setTracks([]);
    this.getTracks();
  },

  render: function() {
    var username = this.props.params.user;
    return (
      <div className="">
        User
        <Tracks {...this.props} />
        <button onClick={this.loadMore}
          className="block col-12 py3 center button button-transparent">
          Load More
        </button>
      </div>
    )
  }

});

module.exports = User;

