import { from } from "@apollo/client";
import { gql } from "@apollo/client";

export const CreateNewComment = gql`
  mutation CreateComment($user_id: Int!, $post_id: Int!, $message: String!) {
    CreateComment(user_id: $user_id, post_id: $post_id, message: $message) {
      id
      message
      post_id
      User {
        id
        email
        first_name
        last_name
        profile_picture_url
      }
    }
  }
`;
