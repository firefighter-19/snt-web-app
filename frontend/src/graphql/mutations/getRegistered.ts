import { gql } from "@apollo/client";

export const GET_REGISTERED = gql`
  mutation createUser($data: CreateUserInput!) {
    registration(createUser: $data) {
      id
      name
      lastName
      role {
        role
      }
    }
  }
`;
