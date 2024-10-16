"use client";
import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  Center,
  Spinner,
  Flex,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { GET_CHARACTERS } from "@/lib/queries";
import { useAuthContext } from "@/Providers/auth";
import CharacterModal from "@/components/CharacterModal";
import CharacterWidget, { Character } from "@/components/Character";

// The home page, handles calling of the api and the pagination
export default function Home({ params }: { params: { page: [string] } }) {
  const [selectedResult, setSelectedResult] = useState<Character | null>(null);
  const {
    isOpen: characterModalIsOpen,
    onOpen: characterModalOnOpen,
    onClose: characterModalOnClose,
  } = useDisclosure();
  const page = params.page ? parseInt(params.page[0]) || 1 : 1;
  const { hasRequiredFields } = useAuthContext();

  // There are better ways to type these results but this is beyond the scope
  // eg https://www.apollographql.com/docs/react/development-testing/static-typing
  const [getData, { data, loading }] = useLazyQuery<{
    characters: {
      info: {
        next: number | null;
      };
      results: [Character];
    };
  }>(GET_CHARACTERS, {
    variables: { page },
  });

  useEffect(() => {
    if (hasRequiredFields) {
      getData();
    }
  }, [hasRequiredFields, getData]);

  const results =
    data &&
    data.characters.results.map((result) => {
      return (
        <CharacterWidget
          character={result}
          key={result.id}
          onClick={() => {
            setSelectedResult(result);
            characterModalOnOpen();
          }}
        />
      );
    });

  return (
    <div>
      {loading && (
        <Center mt="100">
          <Spinner size="xl" />
        </Center>
      )}
      {data && (
        <Box>
          <Flex alignItems="center" flexWrap="wrap" justifyContent="center">
            {results}
          </Flex>
          <Center>
            {page > 1 && (
              <Button
                colorScheme="blue"
                m={5}
                type="button"
                as="a"
                href={`/${page - 1}`}
                w={100}
              >
                Previous
              </Button>
            )}
            {data.characters.info.next && (
              <Button
                colorScheme="blue"
                m={5}
                type="button"
                as="a"
                href={`/${page + 1}`}
                w={100}
              >
                Next
              </Button>
            )}
          </Center>
        </Box>
      )}
      <CharacterModal
        onClose={characterModalOnClose}
        isOpen={characterModalIsOpen}
        character={selectedResult}
      />
    </div>
  );
}
