import { gql } from "@apollo/client";

export const GetPosts = gql`
  query GetPosts($group_id: Int, $referencePostId: Int, $reference: String) {
    GetPosts(
      group_id: $group_id
      referencePostId: $referencePostId
      reference: $reference
    ) {
      posts {
        id
        message
        user_id
        group_id
        image_url
        createdAt
        number_of_likes
        number_of_comments
        User {
          id
          email
          first_name
          last_name
          profile_picture_url
        }
      }
    }
  }
`;
