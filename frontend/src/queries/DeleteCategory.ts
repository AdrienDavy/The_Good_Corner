import { gql } from "../gql";


export const mutationDeleteCategory = gql(`
mutation DeleteCategory($id: ID!) {
  deleteCategory(id: $id) {
    id
  }
}
`);