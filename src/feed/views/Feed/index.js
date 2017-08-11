// @flow

import React from 'react';
import { connect } from 'react-redux';
import { initializeReducers } from 'initializable-reducer';

type Props        = { dispatch: () => mixed };
type State        = void;

/**
 * display the Feed view
 */
class Feed extends React.Component<void, Props, State> {
  logout() {
    this.props.dispatch(initializeReducers());
  }

  render() {
    return (
      <div>
        <h1>Feed</h1>
        <button onClick={this.logout.bind(this)}>Logout</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapDispatchToProps)(Feed);