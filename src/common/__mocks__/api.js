// @flow

/*
 * Mocking API endpoints
 */
const apiEndpoints = {
  loginUser: () => ({
    data: {
      jwt: 'some.cool.jwt'
    }
  }),
  signUpUser: () => ({
    data: {
      jwt: 'some.cool.jwt'
    }
  })
};

export default apiEndpoints;
