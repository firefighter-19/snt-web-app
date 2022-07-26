import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($data: LoginUser!) {
    loginUser(userData: $data) {
      id
      name
      lastName
      role {
        role
      }
    }
  }
`;
