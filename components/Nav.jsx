
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Nav = React.createClass({

  render: function() {
    return (
      <nav className="">
        <Link to="/" className="button button-transparent">Stream</Link>
        <Link to="/jxnblk" className="button button-transparent">User</Link>
      </nav>
    )
  }

});

module.exports = Nav;

