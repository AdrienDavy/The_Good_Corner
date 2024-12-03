import { gql } from "@apollo/client";

export const mutationDeleteCategory = gql`
mutation DeleteCategory($id: ID!) {
  deleteCategory(id: $id) {
    id
  }
}
`;