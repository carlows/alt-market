// @flow

import api from '../../common/api';
import { createThunk } from '../../common/helpers';

export const signUp = createThunk('SIGNUP', values => api.signUpUser(values));
