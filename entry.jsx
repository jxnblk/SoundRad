
import React from 'react'
import Router from 'react-router'
import data from './data'
import css from './app.css'
import routes from './Routes.jsx'

import token from './utils/Token'

data.token = token

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler {...data} />, document.querySelector('#app'))
})

