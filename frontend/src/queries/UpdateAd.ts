import { gql } from "../gql";

export const mutationUpdateAd = gql(`
mutation UpdateAd($data: AdUpdateInput!, $id:ID!) {
  updateAd(data: $data, id:$id) {
    id
  }
}
`);