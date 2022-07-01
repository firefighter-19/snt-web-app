import { useMutation } from "@apollo/client";
import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../graphql/inputTypes/loginUser";
import { LOGIN } from "../graphql/mutations/login";
import { LoggedUser } from "../graphql/types/user";

export const Login: FC = () => {
  const navigate = useNavigate();
  const [loginFields, setLoginFields] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const [login] = useMutation<LoggedUser>(LOGIN, {
    variables: {
      data: {
        email: loginFields.email.trim(),
        password: loginFields.password.trim(),
      },
    },
    onCompleted: (data) => {
      const { loginUser } = data;
      if (loginUser.token.accessToken) {
        window.localStorage.setItem("accessToken", JSON.stringify(loginUser.token.accessToken));
      }
      navigate("/");
    },
    onError: () => {
      navigate("/unauthorized");
      setTimeout(() => navigate("/login"), 3000);
    },
  });

  function changeLogin(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const { value } = target;
    setLoginFields((prevState) => ({ ...prevState, email: value }));
  }

  function changePassword(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const { value } = target;
    setLoginFields((prevState) => ({ ...prevState, password: value }));
  }

  return (
    <form style={{ display: "flex", flexDirection: "column", maxWidth: "15rem" }}>
      <input type="text" value={loginFields.email} onChange={changeLogin} />
      <input type="text" value={loginFields.password} onChange={changePassword} />
      <button
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          login();
        }}
      >
        Войти
      </button>
    </form>
  );
};
