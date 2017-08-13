## Relay GraphQL client demo

Before running `yarn start` you need to get an API token from the backend, create an `.env` file and put the following configuration:

```
API_URL=LOCAL_BACKEND_URL
API_TOKEN=GENERATED_TOKEN_FROM_LOGIN_ENDPOINT
```

Then run `yarn get-schema`, this will make a request to the backend, so make sure you have it running.

After it succeeds run `yarn relay` to compile the relay queries.

Finally, run `yarn start` and debug why the hell it doesn't work, lol.
