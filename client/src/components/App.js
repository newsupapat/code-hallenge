import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import history from '../history'

import Code from './Code'

function App () {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path='/' exact component={Code} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
