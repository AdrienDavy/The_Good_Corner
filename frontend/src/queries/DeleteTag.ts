import { gql } from "@apollo/client";

export const mutationDeleteTag = gql`
mutation DeleteTag($id: ID!) {
  deleteTag(id: $id) {
    id
  }
}
`;