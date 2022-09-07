import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SntContext } from "src/context/snt_context";
import { LOGIN } from "../graphql/mutations/login";
import { LoggedUser } from "../graphql/types/user";

export const useAuth = () => {
  const navigate = useNavigate();
  const { addTokenInfo } = useContext(SntContext);
  const [getUser] = useMutation<LoggedUser>(LOGIN, {
    onCompleted: ({ loginUser }) => {
      window.localStorage.setItem("userId", loginUser.id);
      loginUser.role.forEach((role) => window.localStorage.setItem(`Role: ${role.role}`, role.role));
      const [name, token] = document.cookie.split("=");
      addTokenInfo({ name, token, userRoles: loginUser.role });
      navigate("/");
    },
    onError: () => {
      navigate("/unauthorized");
      setTimeout(() => navigate("/login"), 3000);
    },
  });
  return { getUser };
};
