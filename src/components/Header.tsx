import {
  Box,
  Flex,
  IconButton,
  HStack,
  Input,
  Group,
} from '@chakra-ui/react';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@chakra-ui/react';
import { FiSearch, FiBell, FiMenu } from 'react-icons/fi';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <Box
      bg="white"
      borderBottomWidth="1px"
      borderColor="gray.200"
      px={6}
      py={4}
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" gap={4}>
          <IconButton
            aria-label="Open menu"
            variant="ghost"
            display={{ base: 'flex', md: 'none' }}
            onClick={onMenuClick}
          >
            <FiMenu />
          </IconButton>
          <Group maxW="400px" display={{ base: 'none', md: 'flex' }}>
            <Box pointerEvents="none" position="absolute" left={3} top="50%" transform="translateY(-50%)">
              <FiSearch color="gray" />
            </Box>
            <Input placeholder="Search..." pl={10} />
          </Group>
        </Flex>

        <HStack gap={4}>
          <IconButton
            aria-label="Notifications"
            variant="ghost"
            position="relative"
          >
            <FiBell />
          </IconButton>
          <MenuRoot>
            <MenuTrigger asChild>
              <Box
                as="button"
                cursor="pointer"
                w="32px"
                h="32px"
                borderRadius="full"
                bg="gray.200"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="semibold"
                fontSize="sm"
              >
                AU
              </Box>
            </MenuTrigger>
            <MenuContent>
              <MenuItem value="profile">Profile</MenuItem>
              <MenuItem value="settings">Settings</MenuItem>
              <MenuItem value="logout">Logout</MenuItem>
            </MenuContent>
          </MenuRoot>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
