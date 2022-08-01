import { UserInfo } from "../../graphql/types/user";

export const AccountPreview = ({ getUser: user }: UserInfo): JSX.Element => {
  const { name } = user;
  return (
    <div>
      <p>{name}</p>
    </div>
  );
};
