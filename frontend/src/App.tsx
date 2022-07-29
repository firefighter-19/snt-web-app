import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Unauthorized } from "./components/Unauthorized";
import { MainLayout } from "./pages/Layouts/Main/MainLayout";
import { mainRoutes } from "./routes";

export const App: FC = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      {mainRoutes.map((route) => (
        <Route key={route.id} element={route.element} path={route.path} />
      ))}
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/unauthorized" element={<Unauthorized />} />
  </Routes>
);
