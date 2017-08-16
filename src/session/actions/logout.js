// @flow
import { initializeReducers } from 'initializable-reducer';

export function logout() {
  // we basically just initialize all the reducers again
  return initializeReducers();
}
