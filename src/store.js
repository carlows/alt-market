// @flow

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import localForage from 'localforage';
import reducers from './common/reducers';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import _ from 'lodash';

// Setup Apollo client
const networkInterface = createNetworkInterface({
  uri: `${process.env.REACT_APP_API_URL}/graphql`
});

export const apolloClient = new ApolloClient({
  networkInterface
});

// enable redux dev tools
const composeEnhancers = composeWithDevTools({});

// define middlewares
export const history = createHistory();
const historyMiddleware = routerMiddleware(history);

// gather all middlewares order matters
const middlewares = [
  historyMiddleware,
  thunk,
  // Pass apollo middleware
  apolloClient.middleware()
];

// define reducers combineReducers
const combinedReducers = combineReducers({
  ...reducers,
  routerReducer,
  // Pass the apollo reducer
  apollo: apolloClient.reducer()
});

export function setupStore(onStorePersisted: () => mixed) {
  const store = composeEnhancers(
    applyMiddleware(...middlewares),
    autoRehydrate()
  )(createStore)(combinedReducers);

  const persistOptions = {
    storage: localForage,
    blacklist: []
  };

  persistStore(store, persistOptions, () => {
    onStorePersisted();
  });

  // Configure Middleware for authentication in Apollo
  // http://dev.apollodata.com/react/auth.html#Header
  // We do it here so we can get access to the store object
  const networkMiddleware = {
    applyMiddleware: (req, next) => {
      const { user } = store.getState();
      const token = user.token;
      const headers = token ? { Authorization: `JWT ${token}` } : {};

      req.options.headers = _.extend({}, req.options.headers, headers);
      next();
    }
  };

  // $FlowFixMe
  networkInterface.use([networkMiddleware]);

  return store;
}

export default setupStore;
