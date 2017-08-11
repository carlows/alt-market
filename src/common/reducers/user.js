// @flow

import { enableInitializing } from 'initializable-reducer';

const initialState = {
  is_logged_in: false
};

function user(state: Object = initialState, { type, payload }: Object) {
  switch (type) {
    case 'LOGGED_IN':
      if (payload.status >= 400) {
        return state;
      }

      return {
        ...payload.body.user,
        is_logged_in: true
      };
    default:
      return state;
  }
}

export {
  user,
  initialState
};

export default enableInitializing(user);
