// @flow

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ConnectedRouter from 'react-router-redux/ConnectedRouter.js'
import { Provider } from 'react-redux';
import App from './App.js';
import { history, setupStore } from './store.js';
import registerServiceWorker from './registerServiceWorker';

type State        = { isLoading: boolean, store: Object };
type Props        = Object;

/**
 * holds the application dependencies
 */
class Root extends Component<void, Props, State> {
  state = {
    isLoading: true,
    store: setupStore(this.onStorePersisted.bind(this))
  };

  onStorePersisted() {
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading, store } = this.state;

    return isLoading ? <i>Loading...</i> : (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    );
  }
};


ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
