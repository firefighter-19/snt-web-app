import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../graphql/dto/loginUser";
import { LOGIN } from "../../graphql/mutations/login";
import { LoggedUser } from "../../graphql/types/user";

export const getAuth = ({ email, password }: LoginUser) => {
  const navigate = useNavigate();
  const [getUser, { loading }] = useMutation<LoggedUser>(LOGIN, {
    variables: {
      data: { email, password },
    },
    onCompleted: (data) => {
      window.localStorage.setItem("userId", data.loginUser.id);
      navigate("/");
    },
    onError: () => {
      navigate("/unauthorized");
      setTimeout(() => navigate("/login"), 3000);
    },
  });
  return { getUser, loading };
};
