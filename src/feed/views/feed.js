// @flow

import React from 'react';
import {
  QueryRenderer,
  graphql
} from 'react-relay';
import environment from '../../RelayEnvironment';
import { PublicationList } from '../components';

type Props        = { dispatch: () => mixed };
type State        = void;

const FeedPublicationsQuery = graphql`
  query FeedPublicationsQuery {
    ...PublicationList_publications
  }
`

/**
 * display the Feed view
 */
class Feed extends React.Component<void, Props, State> {
  render() {
    return (
      <div id="feed">
        <QueryRenderer
          environment={environment}
          query={FeedPublicationsQuery}
          render={({error, props}) => {
            if (error) {
              return <div>{error.message}</div>
            } else if (props) {
              return <PublicationList query={props} />
            }
            return <div>Loading</div>
          }}
        />
      </div>
    );
  }
}

export default Feed;
