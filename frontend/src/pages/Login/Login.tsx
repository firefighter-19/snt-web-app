import { useMutation } from "@apollo/client";
import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../../components/Container/Container";
import { Input } from "../../components/Input/Input";
import { LoginUser } from "../../graphql/inputTypes/loginUser";
import { LOGIN } from "../../graphql/mutations/login";
import { LoggedUser } from "../../graphql/types/user";
import classes from "./Login.module.scss";

export const Login: FC = () => {
  const navigate = useNavigate();
  const [loginFields, setLoginFields] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const [getUser, { loading }] = useMutation<LoggedUser>(LOGIN, {
    variables: {
      data: {
        email: loginFields.email.trim(),
        password: loginFields.password.trim(),
      },
    },
    onCompleted: () => {
      navigate("/");
    },
    onError: () => {
      navigate("/unauthorized");
      setTimeout(() => navigate("/login"), 3000);
    },
  });

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

  if (loading) return <div>Загрузка...</div>;

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
