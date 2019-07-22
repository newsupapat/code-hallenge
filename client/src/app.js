import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'

import LandingPage from 'views/CodePage/CodePage'

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' component={LandingPage} />
      </Switch>
    </Router>
  )
}

export default App
