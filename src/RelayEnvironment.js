import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import api from './common/api';

const store = new Store(new RecordSource());

const network = Network.create((operation, variables) => {
  return api.graphqlSchema({ operation, variables })
  .then(success => {
    return success.data;
  });
});

const environment = new Environment({
  network,
  store,
});

export default environment;
