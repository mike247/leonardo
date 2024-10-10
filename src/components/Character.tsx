import { Box, Flex, Avatar, Text } from "@chakra-ui/react";

export type Character = {
  gender: string;
  image: string;
  name: string;
  species: string;
  id: number;
};

type CharacterWidgetProps = {
  character: Character;
  onClick: () => void;
};

export default function CharacterWidget({
  character,
  onClick,
}: CharacterWidgetProps) {
  return (
    <Box
      m="3"
      border="1px"
      borderRadius="5"
      borderColor="#ddd"
      minW="300"
      onClick={onClick}
    >
      <Flex m="2">
        <Avatar src={character.image} />
        <Flex ml="3" alignItems={"center"}>
          <Text fontWeight="bold">{character.name}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
