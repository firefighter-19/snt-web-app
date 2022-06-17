import { gql, useQuery } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";

const VALIDATE_TOKEN = gql`
  query token($data: String!) {
    validateToken(refreshToken: $data) {
      refreshToken
    }
  }
`;

export function App(): JSX.Element {
  const { loading, error } = useQuery(VALIDATE_TOKEN, {
    variables: {
      data: "123",
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
