// @flow

import type { Dispatch } from './types';

/**
 * A helper function to create a thunk (async action)
 * This was inspired by: https://medium.com/@machadogj/async-action-creators-with-redux-thunk-83af81994250
 * @param  {string}    type     - the base name for the action type
 * @param  {Function}  fn       - this function should return a promise
 */
export function createThunk(type: string, fn: (payload: any) => any) {
  return (payload: any) => async (dispatch: Dispatch) => {
    dispatch({
      type: `${type}_STARTED`,
      payload
    });

    try {
      const response = await fn(payload);
      dispatch({
        type: `${type}_SUCCESS`,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: `${type}_ERROR`,
        payload: error
      });
    }

    dispatch({
      type: `${type}_ENDED`,
      payload
    });
  };
}

/**
 * FIX for: https://github.com/apollographql/react-apollo/issues/993
 *
 * Basically, when using 'cache-and-network' in tests, some of our mocks don't
 * get recognized, so we are setting a global variable in our test mocks
 * to overwrite this configuration.
 *
 */
export const appFetchPolicy =
  process.env.REACT_APP_FETCH_POLICY || 'cache-and-network';
