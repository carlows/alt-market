// @flow

import React from 'react';
import { connect } from 'react-redux';

type Props        = { dispatch: () => mixed };
type State        = void;

/**
 * display the login view
 */
class Login extends React.Component<void, Props, State> {
  login() {
    this.props.dispatch({ type: 'LOGGED_IN' });
  }

  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <button onClick={this.login.bind(this)}>Login</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapDispatchToProps)(Login);