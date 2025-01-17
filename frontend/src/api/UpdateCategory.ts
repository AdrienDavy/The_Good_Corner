import { gql } from "../gql";

export const mutationUpdateCategory = gql(`
mutation UpdateCategory($data: CategoryUpdateInput!, $id:ID!) {
  updateCategory(data: $data, id:$id) {
    id
  }
}
`);
