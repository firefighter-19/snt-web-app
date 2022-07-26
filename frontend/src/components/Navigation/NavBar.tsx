import { FC } from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavBar.module.scss";
import { navigationRoutes } from "./navigation-routes";

export const NavBar: FC = () => (
  <nav className={classes.navbar__container}>
    <div className={classes.navbar__list}>
      {navigationRoutes.map((navRoute) => (
        <NavLink key={navRoute.title} to={navRoute.to} className={classes.navbar__list_link}>
          {navRoute.title}
        </NavLink>
      ))}
    </div>
  </nav>
);
