import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Register } from "../../graphql/dto/registerUser";
import { GET_REGISTERED } from "../../graphql/mutations/getRegistered";
import { RegisterUser } from "../../graphql/types/user";

export const getRegistered = ({ email, password, name, lastName, siteNumber }: Register) => {
  const navigate = useNavigate();
  const [register, { loading }] = useMutation<RegisterUser>(GET_REGISTERED, {
    variables: {
      data: { email, password, name, lastName, siteNumber },
    },
    onCompleted: () => {
      navigate("/");
    },
    onError: () => {
      navigate("/unauthorized");
      setTimeout(() => navigate("/login"), 3000);
    },
  });
  return { register, loading };
};
