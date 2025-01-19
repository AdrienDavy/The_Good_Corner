import { gql } from "../gql";


export const queryCategory = gql(`
query QueryTag($tagId: ID!) { 
  tag(id: $tagId) {
    id
    name
    createdBy {
      id
      email
    }
    ads {
      title
      price
      picture
      location
      id
      description
      createdAt
      category {
        id
        name
      }
    }
  }
}

`);
