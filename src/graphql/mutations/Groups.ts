import { gql } from "@apollo/client";

export const CreateGroup = gql`
  mutation CreateGroup($user_id: Int!, $name: String!, $photo_url: String!) {
    CreateGroup(user_id: $user_id, name: $name, photo_url: $photo_url) {
      name
      response
      group_id
      photo_url
      number_of_members
    }
  }
`;
