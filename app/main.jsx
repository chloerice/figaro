'use strict'
import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'

import store from './store'
import Login from './components/users/Login'
import WhoAmI from './components/users/WhoAmI'

const mapState = (state) => ({ user: state.auth })

const App = connect(mapState)((props) =>
  <div>
    <nav>
      { props.user ? <WhoAmI/> : <Login/> }
    </nav>
    { props.children }
  </div>
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
