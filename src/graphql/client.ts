import { ApolloClient, ApolloLink, createHttpLink } from "@apollo/client";
import { cache } from "./cache";
import { onError } from "apollo-link-error";

const errorLink = onError(({ graphQLErrors, networkError }: any) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }: any) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: `http://localhost:5000/graphql`,
});

const client = new ApolloClient({
  cache: cache,
  link: ApolloLink.from([errorLink, httpLink]),
});

export default client;
