import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        next
      }
      results {
        id
        name
        gender
        species
        image
      }
    }
  }
`;
