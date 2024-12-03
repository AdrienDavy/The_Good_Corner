import { gql } from "@apollo/client";

export const mutationCreateTag = gql`
mutation CreateTag($data: TagCreateInput!) {
  createTag(data: $data) {
    id
  }
}
`;