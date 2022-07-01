import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorLayout } from "./components/ErrorLayout";
import { Login } from "./components/Login";
import { MainPageLayout } from "./components/MainPageLayout";
import { Unauthorized } from "./components/Unauthorized";
import { Home } from "./pages/Home/Home";
import { Account } from "./pages/Account/Account";
import { Bills } from "./pages/Bills/Bills";
import { Info } from "./pages/Info/Info";

export const App: FC = () => (
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
