// @flow

import React from 'react';
import { LoginForm } from '../components/';

type Props        = void;
type State        = void;

/**
* display the login view
*/
class Login extends React.Component<void, Props, State> {
  render() {
    return (
      <div id="login">
        <h1>Welcome, this is the login page!</h1>
        <LoginForm />
      </div>
    );
  }
}

export default Login;
