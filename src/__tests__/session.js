// @flow

import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import ConnectedRouter from 'react-router-redux/ConnectedRouter.js'
import { history, setupStore } from '../store.js';
import Login from '../session/views/Login.js';
import App from '../App.js';

let app;
let store;

describe('Session feature', () => {
  beforeAll(() => {
    store = setupStore(jest.fn());
    app = mount(
      <MemoryRouter initialEntries={[ '/login' ]}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </Provider>
      </MemoryRouter>
    );
  });

  test('User should be able to login and go the feed view', () => {
    let findTargetView = () => app.find('#feed');

    expect(findTargetView().node).toBeUndefined();

    let loginButton = app.find('#login button');
    loginButton.simulate('click');

    expect(findTargetView().node).not.toBeUndefined();
  });
});
