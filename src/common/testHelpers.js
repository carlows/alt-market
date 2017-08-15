// @flow

import { mockNetworkInterface } from 'react-apollo/test-utils';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { history, setupStore, apolloClient } from '../store.js';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';
import App from '../App.js';
import { UserProfileQuery } from '../profile/components/UserProfile';
import { PublicationsQuery } from '../feed/components/PublicationList';
import React from 'react';
import type { GraphQLMock } from './types';

export const setupIntegrationTests = (
  mocks: Array<GraphQLMock>,
  initialRoute?: string = '/',
  auth?: boolean = true
) => {
  const networkInterface = mockNetworkInterface.apply(null, mocks);
  const client = new ApolloClient({ networkInterface, addTypename: false });

  const store = setupStore(jest.fn());

  if (auth) {
    store.dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        jwt: 'test'
      }
    });
  }

  const wrapper = mount(
    <ApolloProvider client={client} store={store}>
      <MemoryRouter initialEntries={[initialRoute]} initialIndex={1}>
        <App />
      </MemoryRouter>
    </ApolloProvider>
  );

  return {
    store,
    wrapper
  };
};
