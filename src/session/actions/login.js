// @flow

import api from '../../common/api';

/**
 * We might want to add an action creator to avoid writing this logic repeatedly.
 * It will make life much easier!
 *
 * This is how it would look like: https://medium.com/@machadogj/async-action-creators-with-redux-thunk-83af81994250
 */
export function login({ email, password }) {
  return async (dispatch) => {
    const onSuccess = (success) => {
      dispatch(loginSuccess(success));
      return success;
    };

    const onError = (error) => {
      /*
       * In case error.status is >= 500 we might want to process this error in another function
       * the idea is to process al >= errors in the same place.
       *
       * Errors will return a message so we can centralize error handling.
       */
      dispatch(loginError(error));
      return error;
    };

    try {
      const success = await api.loginUser({ email, password });
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
}

export function loginSuccess(payload) {
  return {
    type: 'LOGIN_SUCCESS',
    payload: payload.data
  };
};

export function loginError(payload) {
  return {
    type: 'LOGIN_ERROR',
    payload: payload.response
  };
}
