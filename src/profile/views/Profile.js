// @flow

import React from 'react';
import { UserProfile, RechargeCurrency } from '../components';
import { Link } from 'react-router-dom';

type DefaultProps = void;
type Props = void;
type State = void;

/**
 * Profile view
 */
class Profile extends React.Component<DefaultProps, Props, State> {
  render() {
    return (
      <div id="profile">
        <h1>Profile</h1>
        <UserProfile />
        <br />
        <RechargeCurrency />
        <br />
        <Link to="/">Feed</Link>
      </div>
    );
  }
}

export default Profile;
