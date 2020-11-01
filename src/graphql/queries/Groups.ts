import { gql } from "@apollo/client";

export const GetGroups = gql`
  query GetGroups($user_id: Int) {
    GetGroups(user_id: $user_id) {
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
