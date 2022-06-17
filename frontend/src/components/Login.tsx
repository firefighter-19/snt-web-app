/* eslint-disable react/function-component-definition */
import { gql, useQuery } from "@apollo/client";
import { FC } from "react";

export enum RoleType {
  ADMIN = "ADMIN",
  CITIZEN = "CITIZEN",
  GUARD = "GUARD",
}

interface RefreshToken {
  userId: string;
  refreshToken: string;
}

interface Role {
  id: string;
  role: RoleType;
}

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  siteNumber: number;
  createdAt?: Date;
  updatedAt?: Date;
  role?: Role[];
  token: RefreshToken;
}

interface LoginUser {
  email: string;
  password: string;
}

const LOGIN = gql`
  query login($data: LoginUser!) {
    loginUser(userData: $data) {
      id
    }
  }
`;

export const Login: FC = () => {
  const loginUser = (data: LoginUser) =>
    useQuery<User>(LOGIN, {
      variables: data,
    });

  const data = {
    email: "fromlhz03@gmail.com",
    password: "5629941",
  };

  return (
    <form onSubmit={() => loginUser(data)}>
      <input />
      <input />
    </form>
  );
};
