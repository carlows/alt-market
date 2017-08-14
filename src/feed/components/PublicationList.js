// @flow

import React from 'react';
import { LogoutButton } from '../../session/components/';
import { Publication } from '../components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class PublicationList extends React.Component {
  render() {
    console.log(this.props);

    // Loading will be true when the request is on the fly
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }

    // We can check errors
    if (this.props.data.error) {
      return <div>{this.props.data.error.message}</div>;
    }

    return (
      <div>
        <div className="feed-publications">
          {
            this.props.data.publications.edges.map(({ node }) => {
              const { id, ...otherProps } = node;

              return (
                <Publication key={id} {...otherProps} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

const PublicationsQuery = gql`query allPublications {
  publications(first: 100) {
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
}`;

export default graphql(PublicationsQuery)(PublicationList);
