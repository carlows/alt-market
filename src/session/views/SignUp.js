// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { SignUpForm } from '../components/';

type DefaultProps = void;
type Props = void;
type State = void;

/**
 * view
 */
class SignUp extends React.Component<DefaultProps, Props, State> {
  render() {
    return (
      <div id="signup">
        <h1>Welcome, this is the SignUp page!</h1>
        <h2>
          Already have an account?{' '}
          <Link id="login-link" to="/login">
            Login!
          </Link>
        </h2>
        <SignUpForm />
      </div>
    );
  }
}

export default SignUp;
