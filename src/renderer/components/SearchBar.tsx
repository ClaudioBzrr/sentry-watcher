import { Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

interface ISearchBar {
  onSearch: (text: string) => void;
}

export default function SearchBar({ onSearch }: ISearchBar) {
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    onSearch(e.target.value);
  }

  return (
    <Stack>
      <InputGroup maxW={64} borderColor="gray.300">
        <InputLeftElement>
          <BiSearchAlt2 size={24} />
        </InputLeftElement>
        <Input
          onChange={(e) => handleSearch(e)}
          placeholder="Pesquisar"
          type="text"
        />
      </InputGroup>
    </Stack>
  );
}
