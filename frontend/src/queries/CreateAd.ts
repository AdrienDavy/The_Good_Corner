import { gql } from "@apollo/client";

export const mutationCreateAd = gql`
mutation CreateAd($data: AdCreateInput!) {
  createAd(data: $data) {
    id
  }
}
`;