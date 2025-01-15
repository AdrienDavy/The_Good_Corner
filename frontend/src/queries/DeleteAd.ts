import { gql } from "../gql";


export const mutationDeleteAd = gql(`
mutation DeleteAd($id: ID!) {
  deleteAd(id: $id) {
    id
  }
}
`);