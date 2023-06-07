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
} from '@chakra-ui/react';
import { IServer } from 'renderer/types/Server';
import {
  BsChevronDown,
  BsChevronUp,
  BsTrashFill,
  BsGearFill,
} from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';

interface IServerList {
  data: IServer[];
  onDeleteServer: (index: number) => void;
}

export default function ServerList({ data, onDeleteServer }: IServerList) {
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
                          onClick={() => onDeleteServer(index)}
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
