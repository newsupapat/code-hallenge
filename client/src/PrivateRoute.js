import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ isSignedIn, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isSignedIn === true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const mapStateToprops = state => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToprops)(PrivateRoute);
