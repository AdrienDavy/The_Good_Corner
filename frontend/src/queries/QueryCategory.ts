import { gql } from "@apollo/client";

export const queryCategory = gql`
query Category($categoryId: ID!) {
  category(id: $categoryId) {
    id
    name
    ads {
      id
      title
      picture
      price
      description
      owner
      location
      createdAt
      tags {
        id
        name
      }
    }
  }
}
`;
