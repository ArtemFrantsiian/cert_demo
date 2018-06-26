import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from '../App';
import {
  Home,
  Register,
  Login,
  Revoke,
  NotFound
} from '../sections';

import PrivateRouter from './PrivateRoute';

export default () => (
  <Router>
    <App>
      <Switch>
        <PrivateRouter exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRouter exact path="/revoke" component={Revoke} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>
)