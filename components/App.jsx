
import React from 'react'
import superagent from 'superagent'
import { RouteHandler } from 'react-router'
import Player from 'audio-player'
import qs from 'qs'
import LocalStorage from '../utils/LocalStorage'
import Controls from './Controls.jsx'
import Nav from './Nav.jsx'
import LogIn from './LogIn.jsx'

import TrackStore from '../stores/TrackStore'
import UserStore from '../stores/UserStore'
import UserActions from '../actions/UserActions'

class App extends React.Component {

  constructor () {
    super ()
    this.state = {
      token: false,
      player: new Player(),
      tracks: TrackStore.getState(),
      playing: false,
      index: 0,
      duration: 0,
      currentTime: 0,
      currentUser: UserStore.getState(),
    }
    this.src = this.src.bind(this)
    this.connect = this.connect.bind(this)
    this.playPause = this.playPause.bind(this)
    this.previous = this.previous.bind(this)
    this.next = this.next.bind(this)
    this.seek = this.seek.bind(this)
  }

  src () {
    var track = this.state.tracks[this.state.index];
    var src = track.stream_url + '?client_id=' + this.props.client_id;
    return src;
  }

  connect () {
    let href = [
      'https://soundcloud.com/connect?',

    ].join('')
    window.location = href
    //'https://soundcloud.com/connect?client_id=' + this.props.client_id + '&redirect_uri=' + this.props.callback_url + '&response_type=code_and_token&scope=non-expiring&display=popup'; 
  }

  /*
  getCurrentUser () {
    //var self = this;
    //var api = this.props.api + '/me';
    //superagent
    //  .get(api)
    //  .query({
    //    client_id: this.props.client_id,
    //    oauth_token: this.state.token
    //  })
    //  .end(function(err, response) {
    //    if (err) {
    //      console.error(err);
    //    }
    //    var user = JSON.parse(response.text);
    //    console.log(user);
    //    self.setState({ currentUser: user });
    //  });
  }
  */

  //setTracks (tracks) {
  //  this.setState({ tracks: tracks });
  //}

  playPause (i) {
    if (typeof i !== 'number') {
      i = this.state.index;
    }
    var track = this.state.tracks[i];
    var src = track.stream_url + '?client_id=' + this.props.client_id;
    var player = this.state.player;
    if (player) {
      player.playPause(src);
      this.setState({ index: i, playing: player.playing });
    }
  }

  previous () {
    var i = this.state.index;
    var player = this.state.player;
    if (i > 0) {
      i--;
      this.setState({ index: i }, function() {
        player.play(this.src());
      });
    } else {
      player.audio.currentTime = 0;
    }
  }

  next () {
    var i = this.state.index;
    var tracks = this.state.tracks;
    var player = this.state.player;
    if (i < tracks.length - 1) {
      i++;
      this.setState({ index: i }, function() {
        player.play(this.src());
      });
    } else {
      player.pause();
    }
  }

  seek (e) {
    var player = this.state.player;
    e.offsetX = e.clientX - e.target.offsetLeft;
    player.seek(e);
  }

  componentDidMount () {
    UserStore.listen(this.onChange)
    UserActions.fetchUser()
    let params = qs.parse(window.location.search.replace(/^\?/, ''))
    let hash = window.location.hash
    let storage = new LocalStorage()
    let token = storage.getObj('token')
    if (token) {
      console.log('stored token', token)
      this.setState({ token: token })
    } else if (hash) {
      let obj = qs.parse(hash.replace(/^\#/, ''))
      if (obj.access_token) {
        let token = obj.access_token
        storage.setObj('token', token)
        this.setState({ token: token })
        console.log(token)
      }
    }
    if (params) {
      console.log('params', params.code)
    }
    // Get token
    var self = this;

    var player = this.state.player;
    player.audio.addEventListener('timeupdate', function() {
      self.setState({
        currentTime: player.audio.currentTime,
        duration: player.audio.duration
      });
    });
    player.audio.addEventListener('ended', function() {
      self.next();
    });
  }

  render () {
    var styles = {
      fixed: {
        position: 'fixed',
        zIndex: 2,
        top: 0,
        right: 0,
        left: 0,
        backgroundColor: 'white'
      },
      body: {
        position: 'relative',
        zIndex: 1,
        marginTop: 144
      }
    }

    return (
      <div className='container px2'>
        <div className='px2' style={styles.fixed}>
          <Nav {...this.props} {...this.state} />
          <Controls
            {...this.props}
            {...this.state}
            playPause={this.playPause}
            previous={this.previous}
            next={this.next}
            seek={this.seek} />
        </div>
        <div style={styles.body}>
          <RouteHandler
            {...this.props}
            {...this.state}
            playPause={this.playPause}
            setTracks={this.setTracks} />
        </div>

        <div className='p4'>
          <code>
            {this.state.token ? 'authed' : 'not authed'}
          </code>
          <hr />
          <LogIn {...this.props} />
        </div>
      </div>
    )
  }

}

export default App

