import { FC, useContext } from "react";
import { NavLink } from "react-router-dom";
import { logOut } from "src/utils/logout";
import { AccountQuery } from "src/pages/Account/AccoutQuery";
import { SntContext } from "src/context/snt_context";
import { UserInfo } from "src/graphql/types/user";
import { AccountPreview } from "src/pages/Account/Preview";
import { RoleType } from "src/graphql/types/role";
import { defaultRoutes } from "./navigation-routes";

import classes from "./NavBar.module.scss";

const SuccessLoad = ({ getUser }: UserInfo) => {
  const { removeTokenInfo } = useContext(SntContext);

  const deleteTokenData = () => {
    logOut();
    removeTokenInfo({ name: "", token: "", userRoles: [] });
  };
  return (
    <>
      <NavLink to="/account" title="Аккаунт" className={classes.navbar__list_link}>
        <AccountPreview getUser={getUser} />
      </NavLink>
      <button type="button" className={classes.navbar__logout} onClick={() => deleteTokenData()}>
        Выйти
      </button>
    </>
  );
};

const UnAuthNav = () => (
  <>
    <NavLink to="/registration" title="Регистрация" className={classes.navbar__list_link}>
      Зарегистрироваться
    </NavLink>
    <NavLink to="/login" title="Войти" className={classes.navbar__list_link}>
      Войти
    </NavLink>
  </>
);

export const NavBar: FC = () => {
  const { state } = useContext(SntContext);
  const IS_USER_ADMIN = window.localStorage.getItem(`Role: ${RoleType.ADMIN}`);
  const checkedRoutes = IS_USER_ADMIN
    ? [
        ...defaultRoutes,
        {
          to: "/settings",
          title: "Настройки",
        },
      ]
    : defaultRoutes;
  return (
    <nav className={classes.navbar__container}>
      <div className={classes.navbar__list_left}>
        {checkedRoutes.map((navRoute) => (
          <NavLink key={navRoute.title} to={navRoute.to} className={classes.navbar__list_link}>
            {navRoute.title}
          </NavLink>
        ))}
      </div>
      <div className={classes.navbar__list_right}>
        {window.localStorage.getItem("userId") || state.token.length ? (
          <AccountQuery ChildComponent={SuccessLoad} ErrorComponent={UnAuthNav} />
        ) : (
          <UnAuthNav />
        )}
      </div>
    </nav>
  );
};
