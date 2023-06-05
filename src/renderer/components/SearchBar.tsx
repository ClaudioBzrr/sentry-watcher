import { Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import { BiSearchAlt2 } from 'react-icons/bi';

export default function SearchBar() {
  return (
    <Stack>
      <InputGroup maxW={64} borderColor="gray.300">
        <InputLeftElement>
          <BiSearchAlt2 size={24} />
        </InputLeftElement>
        <Input placeholder="Pesquisar" type="text" />
      </InputGroup>
    </Stack>
  );
}
