import { Box, Flex, Stack, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import RegisterServerButton from 'renderer/components/RegisterServerButton';
import SearchBar from 'renderer/components/SearchBar';
import ServerList from 'renderer/components/ServerList';
import { IServer } from 'renderer/types/Server';

export default function Home() {
  const toast = useToast();
  const [server, setServers] = useState<IServer[]>([]);

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
      });
    }
  }

  function handleAddServer(data: IServer) {
    setServers([...server, data]);
    localStorage.setItem('server_data', JSON.stringify([...server, data]));
  }

  useEffect(() => loadSavedServers());

  return (
    <Flex justify="center" minH="100vh">
      <Stack align="center" justify="center">
        <Box w="100vw" position="fixed" top={0} p={8}>
          <Stack align="center" justify="center" direction="row">
            <SearchBar />
            <RegisterServerButton />
          </Stack>
        </Box>
        <ServerList data={server} />
      </Stack>
    </Flex>
  );
}
