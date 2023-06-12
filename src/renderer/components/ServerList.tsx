import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  AlertDialogContent,
} from '@chakra-ui/react';
import { IServer } from 'renderer/types/Server';
import {
  BsChevronDown,
  BsChevronUp,
  BsTrashFill,
  BsGearFill,
} from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { useRef, useState } from 'react';

interface IServerList {
  data: IServer[];
  onDeleteServer: (index: number) => void;
}

export default function ServerList({ data, onDeleteServer }: IServerList) {
  const deleteServerAlert = useDisclosure();
  const cancelRef = useRef(null);
  const [selectedServer, setSelectedServer] = useState<{
    index: number;
    name: string;
  }>();

  function handlePretendDeleteServer(index: number, name: string) {
    setSelectedServer({ index, name });
    deleteServerAlert.onOpen();
  }

  function handleDeleteServer(index: number) {
    onDeleteServer(index);
    deleteServerAlert.onClose();
  }

  return (
    <>
      <TableContainer maxH="50vh" overflowY="auto">
        <Table>
          <Thead bg="none" position="sticky" top={0} zIndex="docked">
            <Tr fontWeight="bold">
              <Td>Nome do servidor</Td>
              <Td>Status</Td>
              <Td>Ação</Td>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((e, index) => (
              <Tr key={String(index * 1)}>
                <Td>{e.name}</Td>
                <Td>{e.status}</Td>
                <Td>
                  <Menu>
                    {({ isOpen }) => (
                      <>
                        <MenuButton
                          as={IconButton}
                          icon={
                            isOpen ? (
                              <BsChevronUp size={18} />
                            ) : (
                              <BsChevronDown size={18} />
                            )
                          }
                        />
                        <MenuList>
                          <MenuItem icon={<BsGearFill />}>Reparar</MenuItem>
                          <MenuItem icon={<FiEdit />}>Editar</MenuItem>
                          <MenuItem
                            onClick={() =>
                              handlePretendDeleteServer(index, e.name)
                            }
                            icon={<BsTrashFill />}
                          >
                            Excluir
                          </MenuItem>
                        </MenuList>
                      </>
                    )}
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {selectedServer != null ? (
        <AlertDialog
          onClose={deleteServerAlert.onClose}
          isOpen={deleteServerAlert.isOpen}
          leastDestructiveRef={cancelRef}
          motionPreset="slideInRight"
        >
          <AlertDialogOverlay backdropFilter="blur(5px)">
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Deletar Servidor
              </AlertDialogHeader>
              <AlertDialogBody>
                Deseja realmente deletar o servidor {selectedServer.name}?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={deleteServerAlert.onClose}>
                  Cancelar
                </Button>
                <Button
                  ml={3}
                  colorScheme="red"
                  onClick={() => handleDeleteServer(selectedServer.index)}
                >
                  Deletar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      ) : null}
    </>
  );
}
