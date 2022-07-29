import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($data: ID!) {
    getUser(id: $data) {
      id
      name
      lastName
      siteNumber
      role {
        role
      }
    }
  }
`;
