import { Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';
import { IServer } from 'renderer/types/Server';

interface IServerList {
  data: IServer[];
}

export default function ServerList({ data }: IServerList) {
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
          {data.map((e) => (
            <Tr>
              <Td>{e.name}</Td>
              <Td>{e.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
