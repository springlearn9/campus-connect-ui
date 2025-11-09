import {
  Box,
  VStack,
  Text,
  Icon,
  Flex,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiBook,
  FiCalendar,
  FiSettings,
  FiBarChart2,
} from 'react-icons/fi';
import type { IconType } from 'react-icons';

interface NavItemProps {
  icon: IconType;
  label: string;
  to: string;
}

const NavItem = ({ icon, label, to }: NavItemProps) => {
  return (
    <NavLink to={to} style={{ width: '100%' }}>
      {({ isActive }) => (
        <Flex
          align="center"
          px={4}
          py={3}
          cursor="pointer"
          borderRadius="md"
          bg={isActive ? 'brand.50' : 'transparent'}
          color={isActive ? 'brand.500' : 'inherit'}
          _hover={{ bg: 'brand.50' }}
          transition="all 0.2s"
          gap={3}
        >
          <Icon boxSize={5}>
            {icon({})}
          </Icon>
          <Text fontSize="sm" fontWeight={isActive ? 'semibold' : 'medium'}>
            {label}
          </Text>
        </Flex>
      )}
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <Box
      w="250px"
      bg="white"
      borderRightWidth="1px"
      borderColor="gray.200"
      h="100vh"
      position="sticky"
      top={0}
      display={{ base: 'none', md: 'block' }}
    >
      <Flex direction="column" h="full">
        <Box p={6}>
          <Text fontSize="2xl" fontWeight="bold" color="brand.500">
            Campus Connect
          </Text>
        </Box>

        <VStack gap={1} align="stretch" px={3} flex={1}>
          <NavItem icon={FiHome} label="Dashboard" to="/" />
          <NavItem icon={FiUsers} label="Students" to="/students" />
          <NavItem icon={FiBook} label="Courses" to="/courses" />
          <NavItem icon={FiCalendar} label="Events" to="/events" />
          <NavItem icon={FiBarChart2} label="Analytics" to="/analytics" />
          <NavItem icon={FiSettings} label="Settings" to="/settings" />
        </VStack>
      </Flex>
    </Box>
  );
};

export default Sidebar;
