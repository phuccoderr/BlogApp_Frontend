import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { excludedRoutes } from "./excluded-routes";
import { onLogOut } from "../utils/logout";

const logoutLink = onError((error) => {
  if (
    error.graphQLErrors?.length &&
    (error.graphQLErrors[0].extensions.originalError as any).statusCode === 401
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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
});

export default client;
