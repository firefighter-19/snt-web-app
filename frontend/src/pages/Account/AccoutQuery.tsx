import { useQuery } from "@apollo/client";
import { ElementType, FC } from "react";
import { GET_USER } from "src/graphql/queries/getUser";
import { User, UserInfo } from "src/graphql/types/user";

interface Props {
  ChildComponent: ElementType<UserInfo>;
  ErrorComponent: ElementType;
}

export const AccountQuery: FC<Props> = ({ ChildComponent, ErrorComponent }) => {
  const { data, error, loading } = useQuery<UserInfo>(GET_USER, {
    variables: {
      data: window.localStorage.getItem("userId"),
    },
  });
  if (loading) return <div>Загрузка...</div>;
  if (error) return <ErrorComponent />;
  return <ChildComponent getUser={data?.getUser as User} />;
};
