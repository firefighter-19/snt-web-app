import { getApolloContext, useQuery } from "@apollo/client";
import { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ErrorLayout } from "./components/ErrorLayout";
import { Login } from "./components/Login";
import { MainPageLayout } from "./components/MainPageLayout";
import { Unauthorized } from "./components/Unauthorized";
import { VALIDATE_TOKEN } from "./graphql/queries/validateToken";
import { Home } from "./pages/Home/Home";
import { Account } from "./pages/Account/Account";
import { Bills } from "./pages/Bills/Bills";
import { Info } from "./pages/Info/Info";

export const App: FC = () => {
  const navigate = useNavigate();

  const context = getApolloContext();

  console.log("context ===========>: ", context);
  function navigateToLoginPage() {
    navigate("unauthorized");
    const redirect = setTimeout(() => navigate("login"), 3000);
    return () => clearTimeout(redirect);
  }

  const { loading, data } = useQuery(VALIDATE_TOKEN, {
    onError: () => navigateToLoginPage(),
  });

  if (loading) return <p>Loading...</p>;

  console.log("data ===========>: ", data);

  return (
    <Routes>
      <Route path="/" element={<ErrorLayout />}>
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="/main" element={<MainPageLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="account" element={<Account />} />
        <Route path="bills" element={<Bills />} />
        <Route path="info" element={<Info />} />
      </Route>
    </Routes>
  );
};
