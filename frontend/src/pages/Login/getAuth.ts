import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../graphql/mutations/login";
import { LoggedUser } from "../../graphql/types/user";

interface AuthData {
  email: string;
  password: string;
}

export const getAuth = ({ email, password }: AuthData) => {
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
