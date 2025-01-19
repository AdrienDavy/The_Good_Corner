import { gql } from "../gql";


export const queryCategory = gql(`
query Category($categoryId: ID!) {
  category(id: $categoryId) {
    id
    name
    createdBy {
      id
      email
    }
    ads {
      id
      title
      picture
      price
      description
      location
      createdAt
      createdBy {
      id
      email
    }    
      tags {
        id
        name
      }
      category {
        id
        name
      }
    }
  }
}
`);
