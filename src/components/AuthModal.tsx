"use client";

import {
  Text,
  Modal,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import UserProfileForm from "./forms/UserProfileForm";
import { useAuthContext } from "@/Providers/auth";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

// The modal to hold the 'Auth' form
// Despite not being best practice the easiest way to block the modal is to disable the close actions
export default function AuthModal({ isOpen, onClose }: Props) {
  const { hasRequiredFields } = useAuthContext();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={hasRequiredFields}
      closeOnOverlayClick={hasRequiredFields}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Details</ModalHeader>
        <ModalCloseButton disabled={!hasRequiredFields} />
        <ModalBody>
          <Text mb={5}>These fields are required</Text>
          <UserProfileForm onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
