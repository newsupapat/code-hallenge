import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import Loadable from 'react-loadable'
import styled from 'styled-components'

// View
// import LandingPage from 'views/CodePage/CodePage'
// import LoginPage from 'views/LoginPage/LoginPage'
// import HomePage from 'views/HomePage/Homepage'
import Loading from 'components/Loading/Loader'

import PrivateRoute from './PrivateRoute'

const CenterDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(to bottom right, #070630 0%, #060454 100%);
  min-height: 100vh;
`

const HomePage = Loadable({
  loader: () => import('./views/HomePage/Homepage'),
  loading: () => (
    <CenterDiv>
      <Loading />
    </CenterDiv>
  )
})
const LoginPage = Loadable({
  loader: () => import('./views/LoginPage/LoginPage'),
  loading: () => (
    <CenterDiv>
      <Loading />
    </CenterDiv>
  )
})
const LandingPage = Loadable({
  loader: () => import('./views/CodePage/CodePage'),
  loading: () => (
    <CenterDiv>
      <Loading />
    </CenterDiv>
  )
})

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/login' exact component={LoginPage} />
        <Route path='/code' exact component={LandingPage} />
      </Switch>
    </Router>
  )
}

export default App
