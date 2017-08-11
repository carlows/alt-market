/* @flow */

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import localForage from 'localforage'
import reducers from '../common/reducers';

// enable redux dev tools
const composeEnhancers = composeWithDevTools({});

// define middlewares
export const history = createHistory();
const historyMiddleware = routerMiddleware(history);

// gather all middlewares order matters
const middlewares = [
  historyMiddleware
];

// define reducers combineReducers
const combinedReducers = combineReducers({
  ...reducers,
  routerReducer
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

  return store;
}

export default setupStore;
