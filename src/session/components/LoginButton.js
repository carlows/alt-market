import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

type Props = { dispatch: () => mixed };
type State = void;

class LoginButton extends React.Component<void, Props, State> {
  login = () => {
    this.props.dispatch(login());
  };

  render() {
    return <button onClick={this.login}>Login</button>;
  }
}

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapDispatchToProps)(LoginButton);
