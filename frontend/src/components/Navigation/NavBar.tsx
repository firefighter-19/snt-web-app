import { FC } from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavBar.module.scss";

export const NavBar: FC = () => (
  <nav className={classes.navbar__container}>
    <div className={classes.navbar__list}>
      <NavLink to="/home" title="Домой" className={classes.navbar__list_link}>
        Домой
      </NavLink>
      <NavLink to="/account" title="Личный кабинет" className={classes.navbar__list_link}>
        Личный кабинет
      </NavLink>
      <NavLink to="/bills" title="Счета" className={classes.navbar__list_link}>
        Счета
      </NavLink>
      <NavLink to="/info" title="Новости" className={classes.navbar__list_link}>
        Новости
      </NavLink>
    </div>
  </nav>
);
