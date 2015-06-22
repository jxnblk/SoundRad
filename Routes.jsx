
import React from 'react'
import { Route, DefaultRoute } from 'react-router'

import App from './components/App.jsx'
import Stream from './components/Stream.jsx'
import User from './components/User.jsx'
import Likes from './components/Likes.jsx'
import Playlists from './components/Playlists.jsx'

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Stream} />
    <Route name="user" path=":user" handler={User} />
    <Route name="likes" path=":user/likes" handler={Likes} />
    <Route name="playlists" path=":user/sets" handler={Playlists} />
  </Route>
)

export default routes

