// @flow

import React, { Component } from 'react';
import { Switch } from 'react-router';
import { PrivateRoute, GuestRoute} from './routes';
import Login from '../session/views/login.js';
import Feed from '../feed/views/feed.js';

class App extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute exact path='/' component={Feed} />
        <GuestRoute path='/login' component={Login} />
      </Switch>
    );
  }
}

export default App;
