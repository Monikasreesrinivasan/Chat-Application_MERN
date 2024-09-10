import { ViewIcon } from "@chakra-ui/icons";
import React from 'react'
import {IconButton, Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,  Image, Text,
    ModalCloseButton,} from "@chakra-ui/react"; 
import {useDisclosure,} from "@chakra-ui/hooks";
const ProfileModal = ({user,children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
    ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
    )}
    <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader fontSize="20px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center">{user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody 
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between">         
            <Image
            borderRadius="full"
            boxSize="150px"
            src={user.pic}
            alt={user.name}
          />
          <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >Email: {user.email}
            </Text>

            
          </ModalBody>
          <ModalFooter>
            <Button  colorScheme="blue" mr={3} onClick={onClose}>
                close</Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>    
  );
};

export default ProfileModal
