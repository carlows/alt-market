// @flow

import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { PrivateRoute, GuestRoute } from './routes';
import { Login, SignUp } from './session/views/';
import Feed from './feed/views/Feed.js';
import Profile from './profile/views/Profile.js';

class App extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path="/" component={Feed} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <GuestRoute path="/login" component={Login} />
        <GuestRoute path="/signup" component={SignUp} />
      </Switch>
    );
  }
}

export default App;
