import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions';

type Props        = { dispatch: () => mixed };
type State        = void;

class LogoutButton extends React.Component<void, Props, State> {
  logout() {
    this.props.dispatch(logout());
  }

  render() {
    return (
      <button onClick={this.logout.bind(this)}>Logout</button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapDispatchToProps)(LogoutButton);