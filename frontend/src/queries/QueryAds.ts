import { gql } from "@apollo/client";

export const queryRecentAds = gql`
query Ads{
  ads {
    id
    picture
    title
    price
    createdAt    
  }
}
`;
