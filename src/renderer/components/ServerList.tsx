import { Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';
import { IServer } from 'renderer/types/Server';

interface IServerList {
  data: IServer[];
}

export default function ServerList({ data }: IServerList) {
  return (
    <TableContainer maxW="90vh">
      <Table overflowY="auto">
        <Thead>
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
