import { Box, Flex, Badge, Text, Image } from "@chakra-ui/react";

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
      m="1"
      border="1px"
      borderRadius="5"
      borderColor="#ddd"
      w="200"
      onClick={onClick}
      position="relative"
      overflow="hidden"
      role="group"
    >
      <Image src={character.image} />
      <Box
        position="absolute"
        bottom={{ base: 0, md: -35 }}
        transition="0.3s"
        width="100%"
        background={{ base: "rgba(100, 100, 100, 0.8)", md: "none" }}
        _groupHover={{ bottom: "0", background: "rgba(100, 100, 100, 0.8)" }}
      >
        <Flex ml="2" justifyContent="center" flexDirection="column">
          <Text
            fontWeight="bold"
            mt="2"
            color="white"
            textShadow="2px 2px 10px #000"
          >
            {character.name}
          </Text>
          <Text fontSize="sm" mt="2" mb="2" color="white">
            {character.species}
            <Badge ml="2" colorScheme="green">
              {character.gender}
            </Badge>
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
