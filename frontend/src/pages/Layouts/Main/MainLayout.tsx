import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../../components/Header/Header";
import classes from "./MainLayout.module.scss";

export const MainLayout: FC = () => (
  <div className={classes.mainPageLayout}>
    <Header />
    <Outlet />
  </div>
);
