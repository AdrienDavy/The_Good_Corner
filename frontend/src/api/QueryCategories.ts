import { gql } from "../gql";


export const queryCategories = gql(`
query Categories {
  categories {
    id
    name
    createdAt
    createdBy {
      id
      email
    }
  }    
}
`);
