import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions';
import { withApollo } from 'react-apollo';

type Props = {
  dispatch: () => mixed,
  client: Function,
  history: Function
};
type State = void;

class LogoutButton extends React.Component<void, Props, State> {
  logout = () => {
    this.props.dispatch(logout());
    this.props.client.resetStore();
  };

  render() {
    return <button onClick={this.logout}>Logout</button>;
  }
}

const mapDispatchToProps = dispatch => ({ dispatch });

const ConnectedComponent = connect(mapDispatchToProps)(LogoutButton);

export default withApollo(ConnectedComponent);
