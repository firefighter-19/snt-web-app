import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header/Header";

export const MainPageLayout: FC = () => (
  <div style={{ border: "1px solid black", padding: "1rem" }}>
    <Header />
    <Outlet />
  </div>
);
