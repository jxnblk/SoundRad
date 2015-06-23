
import React from 'react'
import superagent from 'superagent'
import { RouteHandler } from 'react-router'
import qs from 'qs'
import Controls from './Controls.jsx'
import Nav from './Nav.jsx'
import LogIn from './LogIn.jsx'
import PlayerStore from '../stores/PlayerStore'
import UserStore from '../stores/UserStore'
import TrackStore from '../stores/TrackStore'
import UserActions from '../actions/UserActions'
import PlayerActions from '../actions/PlayerActions'

import PageStore from '../stores/PageStore'
import PageActions from '../actions/PageActions'
import Pagination from './Pagination.jsx'

class App extends React.Component {

  constructor () {
    super ()
    this.state = {
      player: PlayerStore.getState().player,
      index: TrackStore.getState().index,
      page: PageStore.getState().page,
      tracks: TrackStore.getState().tracks,
      playlists: TrackStore.getState().playlists,
      user: UserStore.getState().user,
    }
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount () {
    UserStore.listen(this.onChange)
    PlayerStore.listen(this.onChange)
    TrackStore.listen(this.onChange)
    PageStore.listen(this.onChange)
    if (this.props.token) {
      UserActions.fetchUser()
    }
    let page = 1
    let query = this.props.router.query
    if (query && query.page) {
      page = parseInt(query.page, 10)
      PageActions.updatePage(page)
    }
    console.log('App page', page)
  }

  componentDidUnmount () {
    UserStore.unlisten(this.onChange)
    PlayerStore.unlisten(this.onChange)
    TrackStore.unlisten(this.onChange)
    PageStore.unlisten(this.onChange)
  }

  onChange (state) {
    this.setState(state)
  }

  render () {
    const styles = {
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

    console.log('App render page', this.state.page)

    return (
      <div className='container px2'>
        <div className='px2' style={styles.fixed}>
          <Nav {...this.props} {...this.state} />
          <Controls {...this.props} {...this.state} />
        </div>
        <div style={styles.body}>
          <RouteHandler {...this.props} {...this.state} />
          <Pagination {...this.props} {...this.state} />
        </div>

        <div className='p4 border'>
          <code>
            {this.props.token ? ('Connected ' + this.state.user.username) : 'Disconnected'}
          </code>
          <hr />
          <LogIn {...this.props} />
        </div>
      </div>
    )
  }

}

export default App

