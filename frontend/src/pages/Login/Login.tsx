import { ChangeEvent, FC, useState } from "react";
import { Container } from "../../components/Container/Container";
import { Input } from "../../components/Input/Input";
import { LoginUser } from "../../graphql/dto/loginUser";
import { getAuth } from "./getAuth";
import classes from "./Login.module.scss";

export const Login: FC = () => {
  const [loginFields, setLoginFields] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const { getUser } = getAuth({ email: loginFields.email.trim(), password: loginFields.password.trim() });

  const changeLogin = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;
    setLoginFields((prevState) => ({ ...prevState, email: value }));
  };

  const changePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;
    setLoginFields((prevState) => ({ ...prevState, password: value }));
  };

  return (
    <Container>
      <form className={classes.login}>
        <Input title="Логин" value={loginFields.email} onChange={changeLogin} type="text" />
        <Input title="Пароль" value={loginFields.password} onChange={changePassword} type="password" />
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            getUser();
          }}
        >
          Войти
        </button>
      </form>
    </Container>
  );
};
