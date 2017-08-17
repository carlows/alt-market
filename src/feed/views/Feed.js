// @flow

import React from 'react';
import { LogoutButton } from '../../session/components/';
import { PublicationList } from '../components';
import { Link } from 'react-router-dom';

type Props = void;
type State = void;

/**
 * display the Feed view
 */
class Feed extends React.Component<void, Props, State> {
  render() {
    return (
      <div id="feed">
        <h1>Feed</h1>
        <PublicationList />
        <LogoutButton />
        <br />
        <Link to="/profile">My Profile</Link>
      </div>
    );
  }
}

export default Feed;
