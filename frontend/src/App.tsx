import { useQuery } from "@apollo/client";
import { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Unauthorized } from "./components/Unauthorized";
import { VALIDATE_TOKEN } from "./graphql/queries/validateToken";

export const App: FC = () => {
  const navigate = useNavigate();

  function navigateToLoginPage() {
    navigate("unauthorized");
    const redirect = setTimeout(() => navigate("login"), 3000);
    return () => clearTimeout(redirect);
  }

  const { loading } = useQuery(VALIDATE_TOKEN, {
    onError: () => navigateToLoginPage(),
  });

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};
