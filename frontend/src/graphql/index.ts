import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from "@apollo/client";

const authMiddleware = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const context = operation.getContext();
    const authHeader: string = context.response.headers.get("X-Auth-Token");
    window.localStorage.setItem("refreshToken", authHeader);
    return response;
  })
);

const activityMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "X-Auth-Token": localStorage.getItem("refreshToken") || "",
    },
  }));
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql",
});

export const client = new ApolloClient({
  link: from([authMiddleware, activityMiddleware, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  credentials: "include",
});
