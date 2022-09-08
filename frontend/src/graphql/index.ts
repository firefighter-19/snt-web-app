import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from "@apollo/client";

const authMiddleware = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const context = operation.getContext();
    const authHeader: string = context.response.headers.get("X-Auth-Token");
    const [name, token] = document.cookie.split("=");
    if (name !== "refreshToken" || !token || token === "null") {
      document.cookie = `refreshToken=${authHeader}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }
    return response;
  })
);

const activityMiddleware = new ApolloLink((operation, forward) => {
  const [_, token] = document.cookie.split("=");
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "X-Auth-Token": token,
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
