import { gql } from "../gql";


export const queryRecentAds = gql(`
query Ads{
  ads {
    id
    picture
    title
    price
    createdAt    
  }
}
`);
