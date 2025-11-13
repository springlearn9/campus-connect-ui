import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Flex h="100vh" overflow="hidden">
      <Sidebar />
      <Flex direction="column" flex={1} overflow="hidden">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Box flex={1} overflow="auto" bg="gray.50">
          <Box p={6} minH="full">
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
