var fetch = require('node-fetch');
var fs = require('fs');

const {
  buildClientSchema,
  introspectionQuery,
  printSchema,
} = require('graphql/utilities');

var endpoint = process.env.API_URL + '/graphql';

console.log('GraphQL endpoint: ' + endpoint);

fetch(endpoint, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `JWT ${process.env.API_TOKEN}`
  },
  body: JSON.stringify({ 'query': introspectionQuery }),
})
  .then(res => res.json())
  .then(res => {
    console.log(res);
    const schemaString = printSchema(buildClientSchema(res.data));
    fs.writeFileSync('schema.graphql', schemaString);
  });
