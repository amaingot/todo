import Amplify from 'aws-amplify';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';

import App from './App';
import aws_config from './aws-exports';

Amplify.configure(aws_config);

const client = new AWSAppSyncClient({
  url: aws_config.aws_appsync_graphqlEndpoint,
  region: aws_config.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: aws_config.aws_appsync_apiKey,
  },
});

ReactDOM.render(
  /*
    Without "as any" you get this:
    Type 'AWSAppSyncClient<NormalizedCacheObject>' is missing the following properties from type
    'ApolloClient<{}>': clearStoreCallbacks, clientAwareness, stop, onClearStorets(2739).
  */
  <ApolloProvider client={client as any}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>,
  document.getElementById('root')
);
