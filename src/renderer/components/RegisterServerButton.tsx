import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
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
import { BiServer, BiLink } from 'react-icons/bi';
import { IServer } from 'renderer/types/Server';

interface IRegisterServerButton {
  onCreate: (e: IServer) => void;
}

export default function RegisterServerButton({
  onCreate,
}: IRegisterServerButton) {
  const modalAction = useDisclosure();
  const [name, setName] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  function createServer() {
    onCreate({ name, url, status: 'ativo', simpleCheck: true });
    modalAction.onClose();
  }

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
              <InputGroup>
                <InputLeftElement>
                  <BiServer size={20} />
                </InputLeftElement>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite um nome para o servidor"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>URL</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <BiLink size={20} />
                </InputLeftElement>
                <Input
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Digite a url"
                />
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => createServer()} mr={3} colorScheme="blue">
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
