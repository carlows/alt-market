// @flow

import { enableInitializing } from 'initializable-reducer';

const initialState = {
  is_logged_in: false,
  token: '',
  message: ''
};

function user(state: Object = initialState, { type, payload }: Object) {
  switch (type) {
    case 'SIGNUP_SUCCESS':
    case 'LOGIN_SUCCESS':
      return {
        is_logged_in: true,
        token: payload.jwt
      };
    default:
      return state;
  }
}

export { user, initialState };

export default enableInitializing(user);
