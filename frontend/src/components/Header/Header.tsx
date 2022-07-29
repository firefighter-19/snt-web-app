import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Container } from "../Container/Container";
import classes from "./Header.module.scss";

export const Header: FC = () => {
  const IS_USER_LOGGED_IN = !!window.localStorage.getItem("refreshToken");
  return (
    <Container>
      <header className={classes.header}>
        <div className={classes.header__block}>
          <h1 className={classes.header_name}>СНТ Энциклопедист</h1>
          <p className={classes.header_description}>Московская область, Солнечногорский район, д. Носово</p>
        </div>
        {IS_USER_LOGGED_IN ? (
          <NavLink to="/account" title="Аккаунт" className={classes.header__link}>
            Личный кабинет
          </NavLink>
        ) : (
          <NavLink to="/login" title="Войти" className={classes.header__link}>
            Войти
          </NavLink>
        )}
      </header>
    </Container>
  );
};
