# Todo

This is a super simple app that I use for demonstration purposes.

## Interesting features

- **GraphQL Code Generation**: Just run `yarn generate` and both client-side hooks and server resolver types will be generated.
- **GraphQL Subscriptions**: Using Google Pub/Sub and websockets, the user can subscribe to real time data without refreshing their page
- **GCP Identity Provider**: Essentially this is Firebase auth. There are three interesting points we are using for this: validating the authentication header for http requests, validating the connection params for websocket sessions, and also on the client using the custom auth context
- **Kubernetes**: Lots of kubernetes resources defined inside the `k8/` file
- **Model Level Permissions**: Look at the `Todo` typeorm entity, you'll find some interesting ways we do auth
- **Database Helpers**: This helps me do very simple resolvers. See `server/src/db/helpers.ts`, and the resovlers
- **Tag-based Deploys**: When I want to deploy to production, I simple create a release through Github in semvar fashion and CircleCI picks it up for me and deploys!