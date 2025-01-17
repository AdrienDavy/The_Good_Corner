import { gql } from "../gql";


export const mutationCreateCategory = gql(`
mutation CreateCategory($data: CategoryCreateInput!) {
  createCategory(data: $data) {
    id
  }
}
`);
