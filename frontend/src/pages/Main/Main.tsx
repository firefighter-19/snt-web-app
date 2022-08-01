import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { Unauthorized } from "../../components/Unauthorized";
import { mainRoutes } from "../../routes";
import { MainLayout } from "../Layouts/Main/MainLayout";
import { Login } from "../Login/Login";

export const Main: FC = () => (
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
