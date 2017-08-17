// @flow

jest.mock('../common/api');

import React from 'react';
import { logout } from '../session/actions';
import { setupIntegrationTests } from '../common/testHelpers';
import { GraphQLMocks } from '../__mocks__/requests';

let wrapper;
let store;

const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

describe('Session feature', () => {
  beforeEach(() => {
    const config = setupIntegrationTests(GraphQLMocks, '/login', false);
    wrapper = config.wrapper;
    store = config.store;
  });

  test('User should be able to login and go the feed view', async () => {
    expect(wrapper.find('#feed').node).toBeUndefined();

    wrapper
      .find('#login #email')
      .simulate('change', { target: { value: 'john@doe.com' } });
    wrapper
      .find('#login #password')
      .simulate('change', { target: { value: '12345678' } });
    wrapper.find('#login #submit').simulate('submit');

    await flushAllPromises();
    expect(wrapper.find('#feed').node).not.toBeUndefined();
  });

  test('User should be able to go to the signup view from the login view, then signup and go the feed view', async () => {
    expect(wrapper.find('#feed').node).toBeUndefined();

    wrapper.find('#login #signup-link').simulate('click', { button: 0 });

    await flushAllPromises();
    expect(wrapper.find('#signup').node).not.toBeUndefined();

    wrapper
      .find('#signup #first-name')
      .simulate('change', { target: { value: 'john' } });
    wrapper
      .find('#signup #last-name')
      .simulate('change', { target: { value: 'doe' } });
    wrapper
      .find('#signup #email')
      .simulate('change', { target: { value: 'john@doe.com' } });
    wrapper
      .find('#signup #password')
      .simulate('change', { target: { value: '12345678' } });
    wrapper.find('#signup #submit').simulate('submit');

    await flushAllPromises();
    expect(wrapper.find('#feed').node).not.toBeUndefined();
  });
});
