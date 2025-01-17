import { gql } from "../gql";


export const queryAd = gql(`
query Ad($id: ID!) {
  ad(id: $id) {
    createdAt
    description
    id
    location
    owner
    picture
    price
    title
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
