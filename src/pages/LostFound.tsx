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
  Tabs,
} from '@chakra-ui/react';
import { Table } from '@chakra-ui/react';
import { FiSearch, FiPlus, FiPackage } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { lostFoundService, type LostItem, type FoundItem } from '../services/lostFoundService';

const LostFound = () => {
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [foundItems, setFoundItems] = useState<FoundItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const [lostResponse, foundResponse] = await Promise.all([
        lostFoundService.getAllLostItems(),
        lostFoundService.getAllFoundItems(),
      ]);
      setLostItems(lostResponse.data);
      setFoundItems(foundResponse.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'orange';
      case 'FOUND':
        return 'green';
      case 'CLAIMED':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const filteredLostItems = lostItems.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFoundItems = foundItems.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Heading mb={6} size="lg">
        Lost & Found
      </Heading>

      {/* Stats Cards */}
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
        gap={6}
        mb={6}
      >
        <Box bg="white" p={4} borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Flex align="center" gap={3}>
            <Box p={3} bg="red.100" borderRadius="lg">
              <FiPackage size={24} color="#e53e3e" />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">Lost Items</Text>
              <Text fontSize="2xl" fontWeight="bold">{lostItems.length}</Text>
            </Box>
          </Flex>
        </Box>
        <Box bg="white" p={4} borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Flex align="center" gap={3}>
            <Box p={3} bg="green.100" borderRadius="lg">
              <FiPackage size={24} color="#38a169" />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">Found Items</Text>
              <Text fontSize="2xl" fontWeight="bold">{foundItems.length}</Text>
            </Box>
          </Flex>
        </Box>
        <Box bg="white" p={4} borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Flex align="center" gap={3}>
            <Box p={3} bg="orange.100" borderRadius="lg">
              <FiPackage size={24} color="#dd6b20" />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.500">Pending</Text>
              <Text fontSize="2xl" fontWeight="bold">
                {lostItems.filter(item => item.status === 'PENDING').length}
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
              placeholder="Search items..." 
              pl={10}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Group>
          <Button colorPalette="brand">
            <FiPlus />
            Report Item
          </Button>
        </HStack>

        {loading ? (
          <Text>Loading items...</Text>
        ) : (
          <Tabs.Root defaultValue="lost">
            <Tabs.List>
              <Tabs.Trigger value="lost">Lost Items ({lostItems.length})</Tabs.Trigger>
              <Tabs.Trigger value="found">Found Items ({foundItems.length})</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="lost" pt={4}>
              <Box overflowX="auto">
                <Table.Root>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader>Item Name</Table.ColumnHeader>
                      <Table.ColumnHeader>Description</Table.ColumnHeader>
                      <Table.ColumnHeader>Location</Table.ColumnHeader>
                      <Table.ColumnHeader>Status</Table.ColumnHeader>
                      <Table.ColumnHeader>Reported Date</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {filteredLostItems.map((item) => (
                      <Table.Row key={item.id}>
                        <Table.Cell fontWeight="medium">{item.itemName}</Table.Cell>
                        <Table.Cell>{item.description}</Table.Cell>
                        <Table.Cell>{item.location}</Table.Cell>
                        <Table.Cell>
                          <Badge colorPalette={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </Table.Cell>
                        <Table.Cell>
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Box>
            </Tabs.Content>

            <Tabs.Content value="found" pt={4}>
              <Box overflowX="auto">
                <Table.Root>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader>Item Name</Table.ColumnHeader>
                      <Table.ColumnHeader>Description</Table.ColumnHeader>
                      <Table.ColumnHeader>Location</Table.ColumnHeader>
                      <Table.ColumnHeader>Found Date</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {filteredFoundItems.map((item) => (
                      <Table.Row key={item.id}>
                        <Table.Cell fontWeight="medium">{item.itemName}</Table.Cell>
                        <Table.Cell>{item.description}</Table.Cell>
                        <Table.Cell>{item.location}</Table.Cell>
                        <Table.Cell>
                          {item.foundDate ? new Date(item.foundDate).toLocaleDateString() : 'N/A'}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Box>
            </Tabs.Content>
          </Tabs.Root>
        )}
      </Box>
    </Box>
  );
};

export default LostFound;
