import {
  Box,
  Flex,
  IconButton,
  HStack,
  Input,
  Group,
  Badge,
  Text,
} from '@chakra-ui/react';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { FiSearch, FiBell, FiMenu } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { userService, type User } from '../services/userService';
import useNotifications from '../hooks/useNotifications';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const { unreadCount, messages, markAllRead } = useNotifications();

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await userService.getCurrentUser();
        setUser(resp.data);
      } catch (err) {
        // fallback: set mock user for demo
        setUser({
          name: 'John Doe',
          email: 'john.doe@campus.edu',
          role: 'STUDENT'
        } as any);
      }
    };
    load();
  }, []);

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

          <Group maxW="420px" display={{ base: 'none', md: 'flex' }}>
            <Box pointerEvents="none" position="absolute" left={3} top="50%" transform="translateY(-50%)">
              <FiSearch color="gray" />
            </Box>
            <Input 
              placeholder="Global search..." 
              pl={10} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && searchTerm.trim()) {
                  alert(`Searching for: "${searchTerm}"`);
                  // Here you would typically navigate to search results or filter current page
                }
              }}
            />
          </Group>
        </Flex>

        <HStack gap={4}>
          <Box position="relative">
            <IconButton 
              aria-label="Notifications" 
              variant="ghost"
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) markAllRead();
              }}
            >
              <FiBell />
            </IconButton>
            {unreadCount > 0 && (
              <Badge
                position="absolute"
                top="2px"
                right="2px"
                bg="red.500"
                color="white"
                borderRadius="full"
                px={2}
                py={0}
                fontSize="xs"
              >
                {unreadCount}
              </Badge>
            )}
            
            {showNotifications && (
              <Box
                position="absolute"
                top="100%"
                right={0}
                mt={2}
                w="320px"
                bg="white"
                borderRadius="md"
                boxShadow="lg"
                border="1px solid"
                borderColor="gray.200"
                zIndex={1000}
                maxH="400px"
                overflowY="auto"
              >
                <Box p={3} borderBottom="1px solid" borderColor="gray.200">
                  <Text fontWeight="semibold">Notifications ({messages.length})</Text>
                </Box>
                {messages.length === 0 ? (
                  <Box p={4} textAlign="center">
                    <Text color="gray.500">No notifications</Text>
                  </Box>
                ) : (
                  messages.slice(0, 10).map((msg, idx) => (
                    <Box key={msg.id || idx} p={3} borderBottom="1px solid" borderColor="gray.100">
                      <Text fontSize="sm">{msg.text}</Text>
                      {msg.time && <Text fontSize="xs" color="gray.500" mt={1}>{msg.time}</Text>}
                    </Box>
                  ))
                )}
              </Box>
            )}
          </Box>

          <MenuRoot>
            <MenuTrigger asChild>
              <Box cursor="pointer">
                <Flex align="center" gap={3}>
                  <Avatar.Root size="sm">
                    <Avatar.Image src={(user as any)?.photoUrl} />
                    <Avatar.Fallback>{user?.name?.slice(0, 2)?.toUpperCase() ?? 'AU'}</Avatar.Fallback>
                  </Avatar.Root>
                  <Box display={{ base: 'none', md: 'flex' }} flexDirection="column" textAlign="left">
                    <Text fontSize="sm" fontWeight="semibold">{user?.name ?? 'Anonymous'}</Text>
                    <Text fontSize="xs" color="gray.500">{(user as any)?.department ?? ''}</Text>
                  </Box>
                </Flex>
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
