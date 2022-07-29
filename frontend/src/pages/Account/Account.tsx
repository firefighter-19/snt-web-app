import { FC } from "react";
import { User } from "../../graphql/types/user";

interface Props {
  data: User | undefined;
}

export const Account: FC<Props> = ({ data }) => <div>Hello React Typescript</div>;
