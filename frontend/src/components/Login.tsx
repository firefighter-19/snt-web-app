import { useMutation } from "@apollo/client";
import { FC, useState } from "react";
import { LoginUser } from "../graphql/inputTypes/loginUser";
import { LOGIN } from "../graphql/queries/login";

export const Login: FC = () => {
  const [loginFields, setLoginFields] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const [login] = useMutation<LoginUser>(LOGIN, {
    variables: {
      data: {
        email: loginFields.email,
        password: loginFields.password,
      },
    },
    onCompleted: (res) => {
      console.log("res ===========>: ", res);
    },
  });

  function changeLogin(value: string) {
    setLoginFields((prevState) => ({ ...prevState, email: value }));
  }

  function changePassword(value: string) {
    setLoginFields((prevState) => ({ ...prevState, password: value }));
  }

  return (
    <form style={{ display: "flex", flexDirection: "column", maxWidth: "15rem" }}>
      <input type="text" value={loginFields.email} onChange={({ target: { value } }) => changeLogin(value)} />
      <input type="text" value={loginFields.password} onChange={({ target: { value } }) => changePassword(value)} />
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
