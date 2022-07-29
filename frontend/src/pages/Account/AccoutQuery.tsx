import { useQuery } from "@apollo/client";
import { FC } from "react";
import { GET_USER } from "../../graphql/queries/getUser";
import { User } from "../../graphql/types/user";
import { Account } from "./Account";

export const AccountQuery: FC = () => {
  const { data, error, loading } = useQuery<User>(GET_USER, {
    variables: {
      data: window.localStorage.getItem("userId"),
    },
  });
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки...</div>;
  console.log("data ===========>: ", data);
  return <Account data={data} />;
};
