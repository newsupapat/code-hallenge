import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";

import LandingPage from "views/CodePage/CodePage";
import LoginPage from "views/LoginPage/LoginPage";

import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" exact component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default App;
