import { gql } from "@apollo/client";

export const CreateGroup = gql`
  mutation CreateGroup($user_id: Int!, $name: String!, $photo_url: String!) {
    CreateGroup(user_id: $user_id, name: $name, photo_url: $photo_url) {
      groups {
        id
        name
        number_of_members
        photo_url
        admin_user_id
        description
        invite_code
      }
    }
  }
`;

export const JoinGroup = gql`
  mutation JoinGroup($user_id: Int!, $invite_code: String!) {
    JoinGroup(user_id: $user_id, invite_code: $invite_code) {
      groups {
        id
        name
        number_of_members
        photo_url
        admin_user_id
        description
        invite_code
      }
    }
  }
`;
