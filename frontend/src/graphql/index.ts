import { ApolloClient, InMemoryCache } from "@apollo/client";

const accessToken = window.localStorage.getItem("accessToken") || "";

export const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache({
    addTypename: false,
  }),
  credentials: "include",
  headers: { authorization: accessToken },
});
