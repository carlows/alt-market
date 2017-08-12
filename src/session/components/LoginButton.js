import React from 'react';
import { connect } from 'react-redux';

type Props        = { dispatch: () => mixed };
type State        = void;

class LoginButton extends React.Component<void, Props, State> {
  login() {
    this.props.dispatch({ type: 'LOGGED_IN' });
  }

  render() {
    return (
      <button onClick={this.login.bind(this)}>Login</button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapDispatchToProps)(LoginButton);