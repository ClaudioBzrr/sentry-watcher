import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { BsPlus } from 'react-icons/bs';

export default function RegisterServerButton() {
  const modalAction = useDisclosure();
  return (
    <>
      <Button
        onClick={modalAction.onOpen}
        title="Adicionar servidor"
        leftIcon={<BsPlus size={32} />}
      >
        Adicionar
      </Button>
      <Modal
        isCentered
        isOpen={modalAction.isOpen}
        onClose={modalAction.onClose}
      >
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader textAlign="center">Novo servidor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={8}>
              <FormLabel>Nome</FormLabel>
              <Input placeholder="Digite um nome para o servidor" />
            </FormControl>
            <FormControl>
              <FormLabel>URL</FormLabel>
              <Input placeholder="Digite a url" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} colorScheme="blue">
              Salvar
            </Button>
            <Button onClick={modalAction.onClose} colorScheme="red">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
