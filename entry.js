

require('basscss/src/basscss.css');


var React = require('react');
var App = React.createFactory(require('./components/App.jsx'));
var data = require('./data');

React.render(App(data), document.querySelector('#app'));

