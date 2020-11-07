import { gql } from "@apollo/client";

export const CreatePost = gql`
  mutation CreatePost($message: String!, $user_id: Int!, $group_id: Int!) {
    CreatePost(message: $message, user_id: $user_id, group_id: $group_id) {
      post {
        id
        user_id
        group_id
        message
      }
    }
  }
`;
