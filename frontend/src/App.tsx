import { gql, useQuery } from "@apollo/client";

const USERS = gql`
  query getUsers {
    getUsers {
      id
    }
  }
`;

export function App(): JSX.Element {
  const { loading, error, data } = useQuery(USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log("data ===========>: ", data);

  return <div>123</div>;
}
