import axios from 'axios';

const endpoint = 'http://localhost:4000';
const buildUrl = (url) => (`${endpoint}${url}`);

/*
 * Defines all the API endpoints outside of the GraphQL API
 */
const apiEndpoints = {
  loginUser: ({ email, password }) => axios.post(buildUrl('/login'), {
    auth: {
      email,
      password
    }
  })
};

export default apiEndpoints;
