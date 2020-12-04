import { gql } from "@apollo/client";

export const CreatePost = gql`
  mutation CreatePost(
    $message: String!
    $user_id: Int!
    $group_id: Int!
    $image_url: String
  ) {
    CreatePost(
      message: $message
      user_id: $user_id
      group_id: $group_id
      image_url: $image_url
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
