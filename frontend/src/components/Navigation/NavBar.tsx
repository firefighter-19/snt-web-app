import { FC } from "react";
import { NavLink } from "react-router-dom";
import { UserInfo } from "../../graphql/types/user";
import { AccountQuery } from "../../pages/Account/AccoutQuery";
import { AccountPreview } from "../../pages/Account/Preview";
import classes from "./NavBar.module.scss";
import { navigationRoutes } from "./navigation-routes";

export const NavBar: FC = () => {
  const IS_USER_LOGGED_IN = !!window.localStorage.getItem("refreshToken");
  const returnPreview = ({ getUser }: UserInfo) => <AccountPreview getUser={getUser} />;
  return (
    <nav className={classes.navbar__container}>
      <div className={classes.navbar__list_left}>
        {navigationRoutes.map((navRoute) => (
          <NavLink key={navRoute.title} to={navRoute.to} className={classes.navbar__list_link}>
            {navRoute.title}
          </NavLink>
        ))}
      </div>
      <div className={classes.navbar__list_right}>
        {IS_USER_LOGGED_IN ? (
          <NavLink to="/account" title="Аккаунт" className={classes.navbar__list_link}>
            <AccountQuery ChildComponent={returnPreview} />
          </NavLink>
        ) : (
          <>
            <NavLink to="/registration" title="Регистрация" className={classes.navbar__list_link}>
              Зарегистрироваться
            </NavLink>
            <NavLink to="/login" title="Войти" className={classes.navbar__list_link}>
              Войти
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};
