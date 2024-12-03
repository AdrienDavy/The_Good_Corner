import { gql } from "@apollo/client";

export const mutationCreateCategory = gql`
mutation CreateCategory($data: CategoryCreateInput!) {
  createCategory(data: $data) {
    id
  }
}
`;
