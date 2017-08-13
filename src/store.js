/* @flow */

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import localForage from 'localforage';
import reducers from './common/reducers';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

// Setup Apollo client
const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql'
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
  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};  // Create the header object if needed.
      }

      const { user }= store.getState();
      const token = user.token;
      req.options.headers.authorization = token ? `JWT ${token}` : null;

      next();
    }
  }]);

  return store;
}

export default setupStore;
