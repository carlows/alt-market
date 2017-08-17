// @flow

import React from 'react';
import { Publication } from '../components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { appFetchPolicy } from '../../common/helpers';

type DefaultProps = void;
type Props = {
  submit: Function,
  data: Object
};
type State = void;

class PublicationList extends React.Component<DefaultProps, Props, State> {
  render() {
    // Loading will be true when the request is on the fly
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }

    // We can check errors
    if (this.props.data.error) {
      return (
        <div>
          {this.props.data.error.message}
        </div>
      );
    }

    return (
      <div>
        <div className="feed-publications">
          {this.props.data.publications.edges.map(({ node }) => {
            const { id, ...otherProps } = node;

            return <Publication key={id} {...otherProps} />;
          })}
        </div>
      </div>
    );
  }
}

export const PublicationsQuery = gql`
  query {
    publications {
      edges {
        node {
          id
          title
          description
          amount
          currency
        }
      }
    }
  }
`;

export default graphql(PublicationsQuery, {
  options: {
    fetchPolicy: appFetchPolicy,
    pollInterval: 20000
  }
})(PublicationList);
