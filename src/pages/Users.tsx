import {
  Box,
  Heading,
  Badge,
  Button,
  HStack,
  Input,
  Group,
  Grid,
  Text,
  Flex,
  Stack,
} from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@chakra-ui/react';
import { Table } from '@chakra-ui/react';
import { FiSearch, FiPlus, FiUsers } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { userService, type User } from '../services/userService';

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewUser({
      name: '',
      email: '',
      password: '',
      role: 'STUDENT'
    });
  };

  const handleAddUser = async () => {
    try {
      await userService.registerUser(newUser);
      await fetchUsers(); // Refresh the list
      resetForm();
      setShowAddModal(false);
      alert('User added successfully!');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user. Check console for details.');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'red';
      case 'FACULTY':
        return 'blue';
      case 'STUDENT':
        return 'green';
      default:
        return 'gray';
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Heading mb={6} size="lg">
        Users
      </Heading>

      {/* Stats Cards */}
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
        gap={6}
        mb={6}
      >
        <Box bg="white" p={4} borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Flex align="center" gap={3}>
            <Box p={3} bg="blue.100" borderRadius="lg">
              <FiUsers size={24} color="#3182ce" />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">Total Users</Text>
              <Text fontSize="2xl" fontWeight="bold">{users.length}</Text>
            </Box>
          </Flex>
        </Box>
        <Box bg="white" p={4} borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Flex align="center" gap={3}>
            <Box p={3} bg="green.100" borderRadius="lg">
              <FiUsers size={24} color="#38a169" />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">Students</Text>
              <Text fontSize="2xl" fontWeight="bold">
                {users.filter(u => u.role === 'STUDENT').length}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box bg="white" p={4} borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Flex align="center" gap={3}>
            <Box p={3} bg="blue.100" borderRadius="lg">
              <FiUsers size={24} color="#3182ce" />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">Faculty</Text>
              <Text fontSize="2xl" fontWeight="bold">
                {users.filter(u => u.role === 'FACULTY').length}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box bg="white" p={4} borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Flex align="center" gap={3}>
            <Box p={3} bg="red.100" borderRadius="lg">
              <FiUsers size={24} color="#e53e3e" />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">Admins</Text>
              <Text fontSize="2xl" fontWeight="bold">
                {users.filter(u => u.role === 'ADMIN').length}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Grid>

      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        borderWidth="1px"
        borderColor="gray.200"
        boxShadow="sm"
      >
        <HStack mb={6} justifyContent="space-between" flexWrap="wrap" gap={4}>
          <Group maxW="400px">
            <Box pointerEvents="none" position="absolute" left={3} top="50%" transform="translateY(-50%)">
              <FiSearch color="gray" />
            </Box>
            <Input 
              placeholder="Search users..." 
              pl={10}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Group>
          <DialogRoot open={showAddModal} onOpenChange={(e) => setShowAddModal(e.open)}>
            <DialogTrigger asChild>
              <Button colorPalette="brand">
                <FiPlus />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <Stack gap={4}>
                  <Input
                    placeholder="Full Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  />
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    <option value="STUDENT">Student</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </Stack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline" onClick={() => { resetForm(); }}>
                    Cancel
                  </Button>
                </DialogActionTrigger>
                <Button colorPalette="brand" onClick={handleAddUser}>
                  Add User
                </Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
        </HStack>

        {loading ? (
          <Text>Loading users...</Text>
        ) : (
          <Box overflowX="auto">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>ID</Table.ColumnHeader>
                  <Table.ColumnHeader>Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Email</Table.ColumnHeader>
                  <Table.ColumnHeader>Role</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredUsers.map((user) => (
                  <Table.Row key={user.id}>
                    <Table.Cell>{user.id}</Table.Cell>
                    <Table.Cell fontWeight="medium">{user.name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      <Badge colorPalette={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Users;
