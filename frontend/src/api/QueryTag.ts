import { gql } from "../gql";


export const queryCategory = gql(`
query QueryTag($tagId: ID!) { 
  tag(id: $tagId) {
    id
    name
    ads {
      title
      price
      picture
      owner
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
