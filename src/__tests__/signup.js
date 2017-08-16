// @flow

import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { history, setupStore, apolloClient } from '../store.js';
import App from '../App.js';
import { ApolloProvider } from 'react-apollo';
import LoginForm from '../session/components/LoginForm.js';

import { login } from '../session/actions';

let wrap;
let store;

describe('Only authorized users should see the feed', () => {
  beforeAll(() => {
    store = setupStore(jest.fn());

    wrap = mount(
      <ApolloProvider store={store} client={apolloClient}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </ApolloProvider>
    );
  });

  test('Test flow should begin with user logged out', () => {
    expect(store.getState().user.is_logged_in).toBe(false);
  });

  test('should be able to login with existing user', async () => {
    // fill email
    wrap
      .find('#login #email')
      .simulate('change', { target: { value: 'alexis@hashlabs.com' } });
    // fill password
    wrap
      .find('#login #password')
      .simulate('change', { target: { value: '123456789' } });

    wrap.find('#login #submit').simulate('submit');
    // console.log(store.getState());
    await store.dispatch(
      login({ email: 'alexis@hashlabs.com', password: '123456789' })
    );
    // console.log(store.getState());
    console.log(wrap.debug());
    expect(store.getState().user.is_logged_in).toBe(true);
  });

  xtest('User is able to signup', () => {
    wrap.find('#login #signup-link').simulate('click', { button: 0 });
    // fill first name
    wrap
      .find('#signup #first-name')
      .simulate('change', { target: { value: 'john' } });
    // fill last name
    wrap
      .find('#signup #last-name')
      .simulate('change', { target: { value: 'doe' } });
    // fill email
    wrap
      .find('#signup #email')
      .simulate('change', { target: { value: 'john@doe.com' } });
    // fill password
    wrap
      .find('#signup #password')
      .simulate('change', { target: { value: '12345678' } });
    // confirm
    wrap.find('#signup #submit').simulate('submit');
  });

  xtest('User should be logged in after signup', () => {
    expect(store.getState().user.is_logged_in).toBe(true);
  });
});
