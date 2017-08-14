// @flow

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ConnectedRouter from 'react-router-redux/ConnectedRouter.js';
import App from './App.js';
import { history, setupStore, apolloClient } from './store.js';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';

type State = { isLoading: boolean, store: Object };
type Props = Object;

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

    return isLoading
      ? <i>Loading...</i>
      : <ApolloProvider store={store} client={apolloClient}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </ApolloProvider>;
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
