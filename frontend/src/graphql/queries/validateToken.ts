import { gql } from "@apollo/client";

export const VALIDATE_TOKEN = gql`
  query token {
    validateToken {
      refreshToken
    }
  }
`;
