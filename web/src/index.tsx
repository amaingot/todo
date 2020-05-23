import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AuthContextProvider } from "./contexts/AuthContext";
import client from "./graphql/client";

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
