
var React = require('react');

var Progress = React.createClass({
  render: function() {
    var styles = {
      height: '.75rem',
      borderRadius: 0,
      border: '1px solid currentcolor',
      backgroundColor: 'transparent',
      cursor: 'pointer'
    };
    return (
      <progress className="progress"
        {...this.props}
        style={styles} />
    )
  }
});

module.exports = Progress;

