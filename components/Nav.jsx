
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Nav = React.createClass({

  render: function() {
    var userLink = false;
    var likesLink = false;
    var playlistLink = false;
    if (this.props.user) {
      var userslug = this.props.user.permalink;
      var username = this.props.user.username;
      userLink = <Link to={'/'+userslug} className="btn">{username}</Link>
      likesLink = <Link to={'/'+userslug+'/likes'} className="btn">Likes</Link>
      playlistLink = <Link to={'/'+userslug+'/sets'} className="btn">Playlists</Link>
    }
    return (
      <nav className="border-bottom">
        <div className="flex mxn2">
          <Link to="/" className="btn">Stream</Link>
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

