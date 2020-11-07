import { gql } from "@apollo/client";

export const GetPosts = gql`
  query GetPosts($group_id: Int, $page: Int) {
    GetPosts(group_id: $group_id, page: $page) {
      posts {
        id
        message
        user_id
        group_id
        number_of_likes
        number_of_comments
        User {
          id
          email
          first_name
          last_name
        }
      }
    }
  }
`;
