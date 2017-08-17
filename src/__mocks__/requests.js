import { UserMock, PublicationMock } from './data';
import { UserProfileQuery } from '../profile/components/UserProfile';
import { PublicationsQuery } from '../feed/components/PublicationList';
import gql from 'graphql-tag';
import type { GraphQLMock } from '../common/types';

const GraphQLMocks: Array<GraphQLMock> = [
  {
    request: {
      variables: {},
      query: PublicationsQuery
    },
    result: {
      data: {
        publications: {
          edges: [
            {
              node: PublicationMock
            }
          ]
        }
      }
    }
  },
  {
    request: {
      query: UserProfileQuery,
      variables: {}
    },
    result: {
      data: {
        current_user: UserMock
      }
    }
  }
];

export { GraphQLMocks };
