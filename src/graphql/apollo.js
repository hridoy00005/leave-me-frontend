import ApolloClient from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { getAuthData } from "../util";
import { GRAPHQL_URL, GRAPHQL_URL_WS } from "../config";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const uploadLink = createUploadLink({
  uri: GRAPHQL_URL,
});

const wsLink = new WebSocketLink({
  uri: GRAPHQL_URL_WS + "/graphql",
  options: {
    reconnect: true,
    timeout: 20000,
    lazy: true,
  },
});

const authLink = setContext((_, { headers }) => {
  const auth = getAuthData();
  const token = auth.jwtToken ? `Bearer ${auth.jwtToken}` : "";
  return {
    headers: {
      ...headers,
      Authorization: token,
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  authLink.concat(uploadLink)
);

const apollo = new ApolloClient({
  link: ApolloLink.from([errorLink, splitLink]),
  cache: new InMemoryCache({ 
    addTypename: false 
  }),
  defaultHttpLink: false,
  connectToDevTools: true,
});

apollo.defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  },
};

export default apollo;
