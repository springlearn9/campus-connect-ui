import {
  Box,
  Grid,
  Heading,
  Badge,
  Text,
  Flex,
} from '@chakra-ui/react';
import { Table } from '@chakra-ui/react';
import { FiCalendar, FiBell, FiPackage, FiUsers } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import StatsCard from '../components/StatsCard';
import { eventService, type Event } from '../services/eventService';
import { noticeService, type Notice } from '../services/noticeService';
import { lostFoundService, type LostItem } from '../services/lostFoundService';
import { userService, type User } from '../services/userService';

const Dashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [eventsRes, noticesRes, lostItemsRes, usersRes] = await Promise.all([
        eventService.getAllEvents(),
        noticeService.getAllNotices(),
        lostFoundService.getAllLostItems(),
        userService.getAllUsers(),
      ]);
      setEvents(eventsRes.data);
      setNotices(noticesRes.data);
      setLostItems(lostItemsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const upcomingEvents = events.filter(e => e.status === 'ACTIVE').slice(0, 5);
  const highPriorityNotices = notices.filter(n => n.priority === 'HIGH' && n.status === 'ACTIVE').slice(0, 5);

  return (
    <Box>
      <Heading mb={6} size="lg">
        Dashboard Overview
      </Heading>

      {/* Stats Cards */}
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={6}
        mb={8}
      >
        <StatsCard
          title="Total Events"
          value={events.length}
          icon={FiCalendar}
          color="blue"
        />
        <StatsCard
          title="Active Notices"
          value={notices.filter(n => n.status === 'ACTIVE').length}
          icon={FiBell}
          color="purple"
        />
        <StatsCard
          title="Lost Items"
          value={lostItems.filter(i => i.status === 'PENDING').length}
          icon={FiPackage}
          color="orange"
        />
        <StatsCard
          title="Total Users"
          value={users.length}
          icon={FiUsers}
          color="green"
        />
      </Grid>

      <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6} mb={8}>
        {/* Upcoming Events */}
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          boxShadow="sm"
        >
          <Heading size="md" mb={4}>
            Upcoming Events
          </Heading>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <Box overflowX="auto">
              <Table.Root size="sm">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Event</Table.ColumnHeader>
                    <Table.ColumnHeader>Date</Table.ColumnHeader>
                    <Table.ColumnHeader>Location</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {upcomingEvents.map((event) => (
                    <Table.Row key={event.id}>
                      <Table.Cell>{event.title}</Table.Cell>
                      <Table.Cell>{new Date(event.eventDate).toLocaleDateString()}</Table.Cell>
                      <Table.Cell>{event.location}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
          )}
        </Box>

        {/* High Priority Notices */}
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          boxShadow="sm"
        >
          <Heading size="md" mb={4}>
            High Priority Notices
          </Heading>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <Box>
              {highPriorityNotices.map((notice) => (
                <Box key={notice.id} mb={4} pb={4} borderBottomWidth="1px" borderColor="gray.100">
                  <Flex justifyContent="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="medium">
                      {notice.title}
                    </Text>
                    <Badge colorPalette="red">HIGH</Badge>
                  </Flex>
                  <Text fontSize="xs" color="gray.500" lineClamp={2}>
                    {notice.description}
                  </Text>
                  <Text fontSize="xs" color="gray.400" mt={1}>
                    {notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : ''}
                  </Text>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Grid>

      {/* Recent Lost Items */}
      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        borderWidth="1px"
        borderColor="gray.200"
        boxShadow="sm"
      >
        <Heading size="md" mb={4}>
          Recent Lost Items
        </Heading>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Box overflowX="auto">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Item</Table.ColumnHeader>
                  <Table.ColumnHeader>Location</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                  <Table.ColumnHeader>Date</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {lostItems.slice(0, 5).map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell fontWeight="medium">{item.itemName}</Table.Cell>
                    <Table.Cell>{item.location}</Table.Cell>
                    <Table.Cell>
                      <Badge colorPalette={item.status === 'PENDING' ? 'orange' : item.status === 'FOUND' ? 'green' : 'blue'}>
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
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
