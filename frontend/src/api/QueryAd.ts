import { gql } from "../gql";


export const queryAd = gql(`
query Ad($id: ID!) {
  ad(id: $id) {
    createdAt
    description
    id
    location
    picture
    price
    title
    createdBy {
      id
      email
      role
    }
    category {
      id
      name
    }
    tags {
      id
      name
    }
  }
}
`);
