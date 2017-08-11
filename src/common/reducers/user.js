// @flow

import { enableInitializing } from 'initializable-reducer';

const initialState = {
  is_logged_in: false
};

function user(state: Object = initialState, { type, payload }: Object) {
  switch (type) {
    case 'LOGGED_IN':
      return {
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
