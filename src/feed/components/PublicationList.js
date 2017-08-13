// @flow

import React from 'react';
import { LogoutButton } from '../../session/components/';
import { Publication } from '../components';
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

type Props        = { dispatch: () => mixed };
type State        = void;

/**
 * display the Feed view
 */
class PublicationList extends React.Component<void, Props, State> {
  render() {
    return (
      <div>
        <h1>Publication List</h1>
        <div className="feed-publications">
          {
            this.props.publications.edges.map(({ node }) => {
              const { id, ...otherProps } = node;

              return (
                <Publication key={id} {...otherProps} />
              );
            })
          }
        </div>
        <LogoutButton />
      </div>
    );
  }
}

/*
 * The Query type is our Root Query type
 */
export default createFragmentContainer(PublicationList, graphql`
  fragment PublicationList_publications on Query {
    publications(first: 100) @connection(key: "Feed_publications", filters: []) {
      edges {
        node {
          ...Publication_publication
        }
      }
    }
  }
`);
