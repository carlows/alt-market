// @flow

import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { appFetchPolicy } from '../../common/helpers';

type DefaultProps = void;
type Props = {
  current_user: Object,
  loading: Boolean
};
type State = void;

/**
 * UserProfileContainer component
 */
export class UserProfileContainer extends React.Component<
  DefaultProps,
  Props,
  State
> {
  render() {
    const userProps = this.props.current_user;
    return <UserProfile {...userProps} />;
  }
}

type UserProfileProps = {
  first_name: string,
  last_name: string,
  email: string,
  account_balance_BTC: number,
  account_balance_USD: number
};

class UserProfile extends React.PureComponent<
  DefaultProps,
  UserProfileProps,
  State
> {
  render() {
    const {
      first_name,
      last_name,
      email,
      account_balance_USD,
      account_balance_BTC
    } = this.props;

    if (this.props.loading) {
      return <div>Loading</div>;
    }

    return (
      <div className="profile">
        <h2 className="profile-username">
          {first_name} {last_name}
        </h2>
        <p className="profile-email">
          {email}
        </p>
        <p className="profile-amount usd">
          Balance USD: ${account_balance_USD}
        </p>
        <p className="profile-amount btc">
          Balance BTC: {account_balance_BTC}
        </p>
      </div>
    );
  }
}

export const UserProfileQuery = gql`
  query userProfile {
    current_user {
      id
      first_name
      last_name
      email
      account_balance_BTC
      account_balance_USD
    }
  }
`;

/**
 * The props object is like the mapStateToProps function
 *
 */
export default graphql(UserProfileQuery, {
  options: {
    fetchPolicy: appFetchPolicy
  },
  props: ({ data: { loading, current_user } }) => ({
    current_user,
    loading
  })
})(UserProfileContainer);
