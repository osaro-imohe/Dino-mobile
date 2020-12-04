import { gql } from "@apollo/client";

export const SignUp = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $first_name: String!
    $last_name: String!
  ) {
    SignUp(
      email: $email
      password: $password
      first_name: $first_name
      last_name: $last_name
    ) {
      token
      user_id
      first_name
      last_name
      email
      response
      profile_picture_url
    }
  }
`;

export const SignIn = gql`
  mutation SignIn($email: String!, $password: String) {
    SignIn(email: $email, password: $password) {
      token
      user_id
      first_name
      last_name
      email
      response
      profile_picture_url
    }
  }
`;
