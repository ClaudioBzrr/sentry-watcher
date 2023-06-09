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
} from '@chakra-ui/react';
import { IServer } from 'renderer/types/Server';
import {
  BsChevronDown,
  BsChevronUp,
  BsTrashFill,
  BsGearFill,
} from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { useRef } from 'react';

interface IServerList {
  data: IServer[];
  onDeleteServer: (index: number) => void;
}

export default function ServerList({ data, onDeleteServer }: IServerList) {
  const deleServerDialog = useDisclosure();
  const cancelRef = useRef(null);
  function handleDeleteServer(index: number, name: string) {
    return (
      <AlertDialog
        onClose={deleServerDialog.onClose}
        isOpen={deleServerDialog.isOpen}
        leastDestructiveRef={cancelRef}
        motionPreset="slideInRight"
      >
        <AlertDialogOverlay>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Deletar Servidor
          </AlertDialogHeader>
          <AlertDialogBody>Tem certeza que quer deletar esse</AlertDialogBody>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  }

  return (
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
            <Tr>
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
                          onClick={handleDeleteServer(index, e.name)}
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
  );
}
