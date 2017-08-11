/* @flow */

import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';
import Login from '../session/views/Login';

class App extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from='/' to='/login' />
        <Route path="/login" component={Login} />
      </Switch>
    );
  }
}

export default App;
