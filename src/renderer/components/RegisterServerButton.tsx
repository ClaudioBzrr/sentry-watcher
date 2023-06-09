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
  Select,
  Stack,
  Switch,
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
  const [simpleCheck, setSimpleCheck] = useState<boolean>(true);
  const [route, setRoute] = useState<string>('');
  const [method, setMethod] = useState<string>('');

  function createServer() {
    if (simpleCheck === true) {
      onCreate({ name, url, status: 'ativo', simpleCheck });
    } else {
      onCreate({ name, url, status: 'ativo', simpleCheck, route, method });
    }
    setName('');
    setUrl('');
    setSimpleCheck(true);
    modalAction.onClose();
  }

  function cancelRegister() {
    modalAction.onClose();
    setName('');
    setUrl('');
    setSimpleCheck(true);
    setMethod('');
    setRoute('');
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
        onClose={() => cancelRegister()}
      >
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader textAlign="center">Novo servidor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={8}>
              <FormControl>
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
              <FormControl>
                <Stack direction="row" align="center">
                  <Switch
                    onChange={(e) => setSimpleCheck(e.target.checked)}
                    defaultChecked={simpleCheck}
                  />
                  <FormLabel>Verificação simples?</FormLabel>
                </Stack>
              </FormControl>
              {simpleCheck === true ? null : (
                <>
                  <FormControl>
                    <FormLabel>Rota</FormLabel>
                    <InputGroup>
                      <InputLeftElement fontWeight="bold" fontSize="xl">
                        /
                      </InputLeftElement>
                      <Input placeholder="Digite a rota" />
                    </InputGroup>
                  </FormControl>
                  <Select
                    fontWeight="semibold"
                    placeholder="Selecione um método"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                    <option value="PATH">PATH</option>
                  </Select>
                </>
              )}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => createServer()} mr={3} colorScheme="blue">
              Salvar
            </Button>
            <Button onClick={() => cancelRegister()} colorScheme="red">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
