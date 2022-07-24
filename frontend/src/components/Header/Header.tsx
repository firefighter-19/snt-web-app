import { FC } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.scss";

export const Header: FC = () => {
  const IS_USER_LOGGED_IN = false;
  return (
    <div className={classes.header__container}>
      <header className={classes.header}>
        <h1 className={classes.header_name}>СНТ Энциклопедист</h1>
        <p className={classes.header_description}>Московская область, Солнечногорский район, д. Носово</p>
      </header>
      {IS_USER_LOGGED_IN ? (
        <NavLink to="/account" title="Аккаунт">
          X
        </NavLink>
      ) : (
        <NavLink to="/login" title="Войти" className={classes.header__link}>
          Войти
        </NavLink>
      )}
    </div>
  );
};
