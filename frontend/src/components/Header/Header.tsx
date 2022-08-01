import { FC } from "react";
import { Container } from "../Container/Container";
import { NavBar } from "../Navigation/NavBar";
import classes from "./Header.module.scss";

export const Header: FC = () => (
  <Container>
    <NavBar />
    <header className={classes.header}>
      <div className={classes.header__block}>
        <h1 className={classes.header_name}>СНТ Энциклопедист</h1>
        <p className={classes.header_description}>Московская область, Солнечногорский район, д. Носово</p>
      </div>
    </header>
  </Container>
);
