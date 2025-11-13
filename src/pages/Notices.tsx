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
  Textarea,
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
import { FiSearch, FiPlus, FiBell } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { noticeService, type Notice } from '../services/noticeService';

const Notices = () => {
  const location = useLocation();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    description: '',
    category: 'GENERAL',
    priority: 'NORMAL',
    validUntil: '',
    status: 'ACTIVE'
  });

  useEffect(() => {
    fetchNotices();
    
    // Handle search query from dashboard navigation
    if (location.state?.searchQuery) {
      setSearchTerm(location.state.searchQuery);
    }
  }, [location.state]);

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

  const resetForm = () => {
    setNewNotice({
      title: '',
      description: '',
      category: 'GENERAL',
      priority: 'NORMAL',
      validUntil: '',
      status: 'ACTIVE'
    });
  };

  const handleAddNotice = async () => {
    try {
      // Mock user ID for demo - in real app this would come from auth
      await noticeService.createNotice(newNotice, 1);
      await fetchNotices(); // Refresh the list
      resetForm();
      setShowAddModal(false);
      alert('Notice added successfully!');
    } catch (error) {
      console.error('Error adding notice:', error);
      alert('Error adding notice. Check console for details.');
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

  const filteredNotices = notices.filter(notice => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'ALL' || notice.category === categoryFilter;

    const matchesDate = (() => {
      if (!dateFilter) return true;
      const filterDate = new Date(dateFilter);
      const noticeDate = notice.validUntil ? new Date(notice.validUntil) : (notice.createdAt ? new Date(notice.createdAt) : null);
      if (!noticeDate) return false;
      // show notices valid on or after selected date
      return noticeDate >= filterDate;
    })();

    return matchesSearch && matchesCategory && matchesDate;
  });

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
          <Stack direction={{ base: 'column', md: 'row' }} gap={3} align="center">
            <Group maxW="360px">
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
            <select 
              value={categoryFilter} 
              onChange={(e: any) => setCategoryFilter(e.target.value)} 
              style={{
                maxWidth: '220px',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                backgroundColor: 'white'
              }}>
              <option value="ALL">All categories</option>
              <option value="ACADEMIC">Academic</option>
              <option value="ADMINISTRATIVE">Administrative</option>
              <option value="EVENT">Event</option>
              <option value="GENERAL">General</option>
            </select>
            <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
          </Stack>
          <DialogRoot open={showAddModal} onOpenChange={(e) => setShowAddModal(e.open)}>
            <DialogTrigger asChild>
              <Button colorPalette="brand">
                <FiPlus />
                Add Notice
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Notice</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <Stack gap={4}>
                  <Input
                    placeholder="Notice Title"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                  />
                  <Textarea
                    placeholder="Notice Description"
                    value={newNotice.description}
                    onChange={(e) => setNewNotice({...newNotice, description: e.target.value})}
                  />
                  <select
                    value={newNotice.category}
                    onChange={(e) => setNewNotice({...newNotice, category: e.target.value})}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    <option value="GENERAL">General</option>
                    <option value="ACADEMIC">Academic</option>
                    <option value="ADMINISTRATIVE">Administrative</option>
                    <option value="EVENT">Event</option>
                  </select>
                  <select
                    value={newNotice.priority}
                    onChange={(e) => setNewNotice({...newNotice, priority: e.target.value})}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    <option value="LOW">Low Priority</option>
                    <option value="NORMAL">Normal Priority</option>
                    <option value="HIGH">High Priority</option>
                  </select>
                  <Input
                    type="date"
                    placeholder="Valid Until"
                    value={newNotice.validUntil}
                    onChange={(e) => setNewNotice({...newNotice, validUntil: e.target.value})}
                  />
                </Stack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline" onClick={() => { resetForm(); }}>
                    Cancel
                  </Button>
                </DialogActionTrigger>
                <Button colorPalette="brand" onClick={handleAddNotice}>
                  Add Notice
                </Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
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
