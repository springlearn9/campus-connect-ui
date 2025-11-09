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
} from '@chakra-ui/react';
import { Table } from '@chakra-ui/react';
import { FiSearch, FiPlus, FiBell } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { noticeService, type Notice } from '../services/noticeService';

const Notices = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await noticeService.getAllNotices();
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'red';
      case 'NORMAL':
        return 'blue';
      case 'LOW':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ACADEMIC':
        return 'purple';
      case 'ADMINISTRATIVE':
        return 'orange';
      case 'EVENT':
        return 'green';
      case 'GENERAL':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Heading mb={6} size="lg">
        Notices
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
              <FiBell size={24} color="#3182ce" />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">Total Notices</Text>
              <Text fontSize="2xl" fontWeight="bold">{notices.length}</Text>
            </Box>
          </Flex>
        </Box>
        <Box bg="white" p={4} borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Flex align="center" gap={3}>
            <Box p={3} bg="red.100" borderRadius="lg">
              <FiBell size={24} color="#e53e3e" />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">High Priority</Text>
              <Text fontSize="2xl" fontWeight="bold">
                {notices.filter(n => n.priority === 'HIGH').length}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box bg="white" p={4} borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Flex align="center" gap={3}>
            <Box p={3} bg="green.100" borderRadius="lg">
              <FiBell size={24} color="#38a169" />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">Active</Text>
              <Text fontSize="2xl" fontWeight="bold">
                {notices.filter(n => n.status === 'ACTIVE').length}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box bg="white" p={4} borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Flex align="center" gap={3}>
            <Box p={3} bg="purple.100" borderRadius="lg">
              <FiBell size={24} color="#805ad5" />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">Academic</Text>
              <Text fontSize="2xl" fontWeight="bold">
                {notices.filter(n => n.category === 'ACADEMIC').length}
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
              placeholder="Search notices..." 
              pl={10}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Group>
          <Button colorPalette="brand">
            <FiPlus />
            Add Notice
          </Button>
        </HStack>

        {loading ? (
          <Text>Loading notices...</Text>
        ) : (
          <Box overflowX="auto">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Title</Table.ColumnHeader>
                  <Table.ColumnHeader>Category</Table.ColumnHeader>
                  <Table.ColumnHeader>Priority</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                  <Table.ColumnHeader>Valid Until</Table.ColumnHeader>
                  <Table.ColumnHeader>Created</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredNotices.map((notice) => (
                  <Table.Row key={notice.id}>
                    <Table.Cell fontWeight="medium">{notice.title}</Table.Cell>
                    <Table.Cell>
                      <Badge colorPalette={getCategoryColor(notice.category)}>
                        {notice.category}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge colorPalette={getPriorityColor(notice.priority)}>
                        {notice.priority}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge colorPalette={notice.status === 'ACTIVE' ? 'green' : 'gray'}>
                        {notice.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      {notice.validUntil ? new Date(notice.validUntil).toLocaleDateString() : 'N/A'}
                    </Table.Cell>
                    <Table.Cell>
                      {notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : 'N/A'}
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

export default Notices;
