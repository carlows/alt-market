// @flow

import api from '../../common/api';
import { createThunk } from '../../common/helpers';

export const login = createThunk('LOGIN', ({ email, password }) =>
  api.loginUser({ email, password })
);
