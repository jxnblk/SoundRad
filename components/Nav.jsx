
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Nav = React.createClass({

  render: function() {
    var userLink = false;
    var likesLink = false;
    var playlistLink = false;
    if (this.props.currentUser) {
      var userslug = this.props.currentUser.permalink;
      var username = this.props.currentUser.username;
      userLink = <Link to={'/'+userslug} className="button button-transparent">{username}</Link>
      likesLink = <Link to={'/'+userslug+'/likes'} className="button button-transparent">Likes</Link>
      playlistLink = <Link to={'/'+userslug+'/sets'} className="button button-transparent">Playlists</Link>
    }
    return (
      <nav className="border-bottom">
        <div className="flex mxn2">
          <Link to="/" className="button button-transparent">Stream</Link>
          {likesLink}
          {playlistLink}
          <div className="flex-auto" />
          {userLink}
        </div>
      </nav>
    )
  }

});

module.exports = Nav;

