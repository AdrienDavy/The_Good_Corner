import { gql } from "../gql";

export const queryTags = gql(`
query Tags {
  tags {
    id
    name
    createdBy {
      id
      email
    } 
  }
}
`);
