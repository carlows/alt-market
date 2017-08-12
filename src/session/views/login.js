// @flow

import React from 'react';
import { LoginButton } from '../components/';

type Props        = void;
type State        = void;

/**
 * display the login view
 */
class Login extends React.Component<void, Props, State> {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <LoginButton />
      </div>
    );
  }
}

export default Login;