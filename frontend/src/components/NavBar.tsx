import { FC } from "react";
import { NavLink } from "react-router-dom";

export const NavBar: FC = () => (
  <nav style={{ display: "flex", justifyContent: "space-around" }}>
    <NavLink to="/home">Домой</NavLink>
    <NavLink to="/account" title="Личный кабинет">
      Личный кабинет
    </NavLink>
    <NavLink to="/bills" title="Счета">
      Счета
    </NavLink>
    <NavLink to="/info" title="Новости">
      Новости
    </NavLink>
  </nav>
);
