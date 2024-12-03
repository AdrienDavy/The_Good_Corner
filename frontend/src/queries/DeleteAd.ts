import { gql } from "@apollo/client";

export const mutationDeleteAd = gql`
mutation DeleteAd($id: ID!) {
  deleteAd(id: $id) {
    id
  }
}
`;