

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var App = require('./components/App.jsx');
var Stream = require('./components/Stream.jsx');
var User = require('./components/User.jsx');
var data = require('./data');
require('basscss/src/basscss.css');

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Stream} />
    <Route name="user" path=":userId" handler={User} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler {...data} />, document.querySelector('#app'));
});

