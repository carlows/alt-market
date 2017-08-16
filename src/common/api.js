import axios from 'axios';

const endpoint = process.env.REACT_APP_API_URL;
const buildUrl = url => `${endpoint}${url}`;

/*
 * Defines all the API endpoints outside of the GraphQL API
 */
const apiEndpoints = {
  loginUser: ({ email, password }) =>
    axios.post(buildUrl('/login'), {
      auth: {
        email,
        password
      }
    }),
  signUpUser: ({ firstName, lastName, email, password }) =>
    axios.post(buildUrl('/signup'), {
      user: {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: password
      }
    })
};

export default apiEndpoints;
