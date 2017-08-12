// @flow

import React from 'react';
import { LogoutButton } from '../../session/components/';

type Props        = { dispatch: () => mixed };
type State        = void;

/**
 * display the Feed view
 */
class Feed extends React.Component<void, Props, State> {
  render() {
    return (
      <div id="feed">
        <h1>Feed</h1>
        <LogoutButton />
      </div>
    );
  }
}

export default Feed;