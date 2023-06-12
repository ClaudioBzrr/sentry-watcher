import { Box, Flex, Stack, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import RegisterServerButton from 'renderer/components/RegisterServerButton';
import SearchBar from 'renderer/components/SearchBar';
import ServerList from 'renderer/components/ServerList';
import { IServer } from 'renderer/types/Server';

export default function Home() {
  const [searchedText, setSearchedText] = useState<string>('');
  const toast = useToast();
  const [servers, setServers] = useState<IServer[]>([]);

  function updateServerValue(value: IServer[]) {
    setServers(value);
    localStorage.setItem('server_data', JSON.stringify(value));
  }

  function loadSavedServers() {
    try {
      const savedServers: IServer[] = JSON.parse(
        localStorage.getItem('server_data')!
      );
      if (savedServers) {
        setServers(savedServers);
      }
    } catch (err) {
      toast({
        status: 'error',
        title: 'Erro ao carregar informações',
        description: String(err),
        duration: 5000,
        position: 'top',
        isClosable: true,
      });
    }
  }

  function handleAddServer(data: IServer) {
    try {
      updateServerValue([...servers, data]);
      toast({
        title: 'Sucesso',
        description: `Servidor ${data.name} criado com sucesso`,
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: String(err),
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  function handleDeleteServer(index: number) {
    updateServerValue(servers.filter((e, i) => index !== i));
  }

  const filteredServers = servers.filter((e) => {
    const searchedTextMatch =
      searchedText.length > 0
        ? e.name.toLowerCase().includes(searchedText) ||
          e.url.toLowerCase().includes(searchedText)
        : true;

    return searchedTextMatch;
  });
  useEffect(() => {
    loadSavedServers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex justify="center" minH="100vh">
      <Stack align="center" justify="center">
        <Box w="100vw" position="fixed" top={0} p={8}>
          <Stack direction="column" align="center" justify="center">
            <Stack align="center" justify="center" direction="row">
              <SearchBar onSearch={(e) => setSearchedText(e)} />
              <RegisterServerButton onCreate={(e) => handleAddServer(e)} />
            </Stack>
            <Stack mt={8} overflowY="auto">
              <ServerList
                onDeleteServer={(e) => handleDeleteServer(e)}
                data={filteredServers}
              />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
