import { defineConfig } from "vite";
import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { excludedRoutes } from "./excluded-routes";
import { onLogOut } from "../utils/logout";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { WS_URL } from "./urls";
import { getMainDefinition } from "@apollo/client/utilities";

const logoutLink = onError((error) => {
  if (
    error.graphQLErrors?.length &&
    (error.graphQLErrors[0].extensions?.originalError as any)?.statusCode ===
      401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogOut();
    }
  }
});

const httpLink = new HttpLink({
  uri: "http://localhost:3001/graphql",
  credentials: "include", // Include cookies in requests
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${WS_URL}/graphql`,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(splitLink),
});

export default client;
