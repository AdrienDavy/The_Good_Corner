import { gql } from "../gql";


export const mutationCreateAd = gql(`
mutation CreateAd($data: AdCreateInput!) {
  createAd(data: $data) {
    id
  }
}
`);