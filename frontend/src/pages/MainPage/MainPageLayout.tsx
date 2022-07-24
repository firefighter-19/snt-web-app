import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { NavBar } from "../../components/Navigation/NavBar";
import classes from "./MainPageLayout.module.scss";

export const MainPageLayout: FC = () => (
  <div className={classes.mainPageLayout}>
    <Header />
    <NavBar />
    <Outlet />
  </div>
);
