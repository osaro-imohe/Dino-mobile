import { gql } from "@apollo/client";

export const GetComments = gql`
  query GetComments(
    $post_id: Int
    $referenceCommentId: Int
    $reference: String
  ) {
    GetComments(
      post_id: $post_id
      referenceCommentId: $referenceCommentId
      reference: $reference
    ) {
      id
      post_id
      message
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
