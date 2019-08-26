import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import history from './history'
import { UpdateUser } from 'actions/index'

const PrivateRoute = ({
  UpdateUser,
  isSignedIn,
  component: Component,
  ...rest
}) => {
  useEffect(() => {
    console.log(Cookies.get('_user'))
  }, [])
  if (isSignedIn) {
    return <Route {...rest} render={props => <Component {...props} />} />
  } else {
    if (Cookies.get('_user')) {
      console.log(JSON.parse(Cookies.get('_user')))
      UpdateUser(JSON.parse(Cookies.get('_user')))
      return <Route {...rest} render={props => <Component {...props} />} />
    }
    return (
      <Route
        {...rest}
        render={props => {
          console.log(history)
          if (history.location.pathname === '/login') {
            return <Component {...props} />
          }
          return Cookies.get('_user') ? (
            <Component {...props} />
          ) : (
            history.push('/login')
          )
        }}
      />
    )
  }
}

const mapStateToprops = state => {
  return { isSignedIn: state.auth.isSignedIn }
}
export default connect(
  mapStateToprops,
  { UpdateUser }
)(PrivateRoute)
