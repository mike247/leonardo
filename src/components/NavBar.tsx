"use client";
import { useEffect } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import AuthModal from "@/components/AuthModal";
import { useAuthContext } from "@/Providers/auth";

type Props = {
  children: React.ReactNode;
  href: string;
};

const NavLink = ({ children, href }: Props) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={href}
    >
      {children}
    </Box>
  );
};

export default function NavBar() {
  const { hasRequiredFields } = useAuthContext();
  const {
    isOpen: hamburgerIsOpen,
    onOpen: hamburgerOnOpen,
    onClose: hamburgerOnClose,
  } = useDisclosure();
  const {
    isOpen: modalIsOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose,
  } = useDisclosure();

  // Future menu items
  const Links = [
    { title: "Nav example", href: "1" },
    { title: "Second nav example", href: "2" },
  ];

  useEffect(() => {
    if (typeof hasRequiredFields !== "undefined" && !hasRequiredFields) {
      modalOnOpen();
    }
  }, [modalOnOpen, hasRequiredFields]);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={hamburgerIsOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={hamburgerIsOpen ? hamburgerOnClose : hamburgerOnOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map(({ title, href }) => (
                <NavLink key={title} href={href}>
                  {title}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              mr={4}
              leftIcon={<EditIcon />}
              onClick={modalOnOpen}
            >
              Profile
            </Button>
            <Avatar
              size={"sm"}
              src={
                "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              }
            />
          </Flex>
        </Flex>

        {hamburgerIsOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map(({ title, href }) => (
                <NavLink key={title} href={href}>
                  {title}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <AuthModal isOpen={modalIsOpen} onClose={modalOnClose} />
    </>
  );
}
