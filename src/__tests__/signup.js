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

const waitsFor = (cb, eventName, done) => {
  console.log(eventName);
  let timeStarted = new Date();
  let ticker = setInterval(function() {
    try {
      cb();
    } catch (e) {
      return;
    } finally {
      if (new Date() - timeStarted >= 1000) {
        clearInterval(ticker);
        done();
      }
    }
  }, 10);
};

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

  xtest('Test flow should begin with user logged out', () => {
    expect(store.getState().user.is_logged_in).toBe(false);
  });

  test('should be able to login with existing user', done => {
    // fill email
    wrap
      .find('#login #email')
      .simulate('change', { target: { value: 'alexis@hashlabs.com' } });
    // fill password
    wrap
      .find('#login #password')
      .simulate('change', { target: { value: '123456789' } });

    wrap.find('#login #submit').simulate('submit');

    waitsFor(
      () => {
        expect(wrap.find('#feed').node).toBeDefined();
      },
      'submit',
      done
    );
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
