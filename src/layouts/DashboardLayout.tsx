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
        <Box flex={1} overflow="auto" p={6} bg="gray.50">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
