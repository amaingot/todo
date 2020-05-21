import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

import firebase from "firebase/app";
import "firebase/auth";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AuthContextProvider } from "./contexts/AuthContext";
import config from "./utils/config";

var firebaseConfig = {
  apiKey: "AIzaSyCXEfo_E5n2FbZx17A8kyYx4zN6O4d_Xhw",
  authDomain: "hmm-dev.firebaseapp.com",
  databaseURL: "https://hmm-dev.firebaseio.com",
  projectId: "hmm-dev",
  storageBucket: "hmm-dev.appspot.com",
  messagingSenderId: "411904317709",
  appId: "1:411904317709:web:0dcd4217710f3098bc7844",
};

firebase.initializeApp(firebaseConfig);
firebase.auth().tenantId = config.TENANT_ID;

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "/graphql"
      : "http://localhost:8080/graphql",
  request: async (operation) => {
    const token = await firebase.auth().currentUser?.getIdToken();
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
  cache: new InMemoryCache({
    resultCaching: true,
    freezeResults: true,
    dataIdFromObject: (item) => item.id,
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
