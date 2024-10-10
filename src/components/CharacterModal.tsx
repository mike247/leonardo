"use client";

import {
  Text,
  Modal,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  Flex,
  Avatar,
  Badge,
  Box,
} from "@chakra-ui/react";
import { Character } from "./Character";

type Props = {
  isOpen: boolean;
  character: Character | null;
  onClose: () => void;
};

// The expanded modal with some dummy text for the detailed character view
export default function CharacterModal({ isOpen, onClose, character }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Character info</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column">
            <Flex>
              <Avatar src={character?.image} />
              <Box ml="3">
                <Text fontWeight="bold">
                  {character?.name}
                  <Badge ml="1" colorScheme="green">
                    {character?.gender}
                  </Badge>
                </Text>
                <Text fontSize="sm">{character?.species}</Text>
              </Box>
            </Flex>
            <Text fontSize="sm" mt="3" mb="5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
