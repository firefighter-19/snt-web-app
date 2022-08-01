import { useQuery } from "@apollo/client";
import { ElementType, FC } from "react";
import { GET_USER } from "../../graphql/queries/getUser";
import { User, UserInfo } from "../../graphql/types/user";

interface Props {
  ChildComponent: ElementType<UserInfo>;
}

export const AccountQuery: FC<Props> = ({ ChildComponent }) => {
  const { data, error, loading } = useQuery<UserInfo>(GET_USER, {
    variables: {
      data: window.localStorage.getItem("userId"),
    },
  });
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки...</div>;
  return <ChildComponent getUser={data?.getUser as User} />;
};
