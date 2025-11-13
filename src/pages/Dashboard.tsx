import {
  Box,
  Grid,
  Heading,
  Badge,
  Text,
  Button,
  HStack,
  VStack,
  Flex,
  Input,
  InputGroup,
} from '@chakra-ui/react';
// import { Table } from '@chakra-ui/react'; // Not used in enhanced version
import { 
  FiCalendar, 
  FiBell, 
  FiPackage, 
  FiUsers, 
  FiTrendingUp, 
  FiActivity,
  FiBookOpen,
  FiMapPin,
  FiClock,
  FiEye,
  FiArrowUp,
  FiArrowRight,
  FiSearch
} from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import StatsCard from '../components/StatsCard'; // Using enhanced version instead
import { eventService, type Event } from '../services/eventService';
import { noticeService, type Notice } from '../services/noticeService';
import { lostFoundService, type LostItem } from '../services/lostFoundService';
import { userService, type User } from '../services/userService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Navigation handlers
  const handleViewAllEvents = () => {
    navigate('/events');
  };

  const handleViewAllLostItems = () => {
    navigate('/lost-found');
  };

  const handleCreateEvent = () => {
    navigate('/events');
    // The Events page already has an "Add Event" button that will open the modal
  };

  const handlePostNotice = () => {
    navigate('/notices');
    // The Notices page already has an "Add Notice" button
  };

  const handleReportLostItem = () => {
    navigate('/lost-found');
    // The Lost & Found page already has the report form
  };

  const handleGlobalSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to notices with the search query
      navigate('/notices', { state: { searchQuery } });
    }
  };

  const handleEventClick = (eventId: number | undefined) => {
    if (eventId) {
      navigate('/events', { state: { highlightEvent: eventId } });
    }
  };

  const handleLostItemClick = (itemId: number | undefined) => {
    if (itemId) {
      navigate('/lost-found', { state: { highlightItem: itemId } });
    }
  };

  const upcomingEvents = events.filter(e => e.status === 'ACTIVE').slice(0, 3);
  const highPriorityNotices = notices.filter(n => n.priority === 'HIGH' && n.status === 'ACTIVE').slice(0, 3);
  const recentLostItems = lostItems.slice(0, 3);

  // Enhanced Stats Card Component
  const EnhancedStatsCard = ({ title, value, icon: Icon, color, trend, description }: any) => (
    <Box
      bg={`linear-gradient(135deg, ${color}.50 0%, ${color}.100 100%)`}
      p={6}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={`${color}.200`}
      boxShadow="lg"
      position="relative"
      overflow="hidden"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'xl',
        transition: 'all 0.3s ease'
      }}
      transition="all 0.3s ease"
    >
      {/* Background Pattern */}
      <Box
        position="absolute"
        top="-20px"
        right="-20px"
        w="80px"
        h="80px"
        opacity={0.1}
        transform="rotate(15deg)"
      >
        <Icon size={60} />
      </Box>
      
      <VStack align="start" gap={2}>
        <HStack justify="space-between" w="full">
          <Box p={3} bg={`${color}.500`} borderRadius="lg" color="white">
            <Icon size={24} />
          </Box>
          {trend && (
            <HStack color={`${color}.600`} fontSize="sm">
              <FiArrowUp size={16} />
              <Text fontWeight="semibold">+{trend}%</Text>
            </HStack>
          )}
        </HStack>
        
        <VStack align="start" gap={0}>
          <Text fontSize="3xl" fontWeight="bold" color={`${color}.700`}>
            {value}
          </Text>
          <Text fontSize="sm" fontWeight="medium" color={`${color}.600`}>
            {title}
          </Text>
          {description && (
            <Text fontSize="xs" color={`${color}.500`}>
              {description}
            </Text>
          )}
        </VStack>
      </VStack>
    </Box>
  );

  // Activity Timeline Component
  const ActivityCard = ({ icon: Icon, title, description, time, color }: any) => (
    <Flex gap={3} p={4} bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.100" _hover={{ bg: "gray.50" }}>
      <Box p={2} bg={`${color}.100`} borderRadius="full">
        <Icon size={16} color={`var(--chakra-colors-${color}-500)`} />
      </Box>
      <VStack align="start" gap={1} flex={1}>
        <Text fontSize="sm" fontWeight="semibold">{title}</Text>
        <Text fontSize="xs" color="gray.500">{description}</Text>
        <Text fontSize="xs" color="gray.400">{time}</Text>
      </VStack>
    </Flex>
  );

  return (
    <Box bg="gray.50" minH="100vh" m={-6}>
      {/* Header Section */}
      <Box 
        bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
        color="white" 
        p={8} 
        borderRadius="0 0 24px 24px"
        mb={6}
      >
        <Flex justify="space-between" align="start" wrap="wrap" gap={4}>
          <VStack align="start" gap={2}>
            <Heading size="2xl" fontWeight="bold">
              Campus Connect Dashboard
            </Heading>
            <Text fontSize="lg" opacity={0.9}>
              Welcome back! Here's what's happening on campus today.
            </Text>
            <HStack gap={4} opacity={0.8}>
              <Text fontSize="sm">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
              <Text fontSize="sm">•</Text>
              <Text fontSize="sm">
                {new Date().toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit'
                })}
              </Text>
            </HStack>
          </VStack>
          
          {/* Global Search */}
          <Box minW="300px">
            <HStack>
              <InputGroup>
                <Input
                  placeholder="Search events, notices, lost items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleGlobalSearch()}
                  bg="whiteAlpha.200"
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                  color="white"
                  _placeholder={{ color: 'whiteAlpha.700' }}
                  _hover={{ bg: "whiteAlpha.300" }}
                  _focus={{ bg: "whiteAlpha.300", borderColor: "whiteAlpha.500" }}
                />
              </InputGroup>
              <Button
                size="md"
                bg="whiteAlpha.200"
                color="white"
                _hover={{ bg: "whiteAlpha.300" }}
                onClick={handleGlobalSearch}
              >
                <FiSearch />
              </Button>
            </HStack>
          </Box>
        </Flex>
      </Box>

      <Box px={6}>
        {/* Enhanced Stats Cards */}
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={6}
          mb={8}
        >
          <EnhancedStatsCard
            title="Total Events"
            value={events.length}
            icon={FiCalendar}
            color="blue"
            trend="12"
            description="This month"
          />
          <EnhancedStatsCard
            title="Active Notices"
            value={notices.filter(n => n.status === 'ACTIVE').length}
            icon={FiBell}
            color="purple"
            trend="8"
            description="Urgent updates"
          />
          <EnhancedStatsCard
            title="Lost Items"
            value={lostItems.filter(i => i.status === 'PENDING').length}
            icon={FiPackage}
            color="orange"
            trend="5"
            description="Pending recovery"
          />
          <EnhancedStatsCard
            title="Total Users"
            value={users.length}
            icon={FiUsers}
            color="green"
            trend="15"
            description="Active members"
          />
        </Grid>

        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} mb={8}>
          {/* Main Content Area */}
          <VStack gap={6}>
            {/* Upcoming Events - Enhanced */}
            <Box
              bg="white"
              p={6}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="gray.200"
              boxShadow="lg"
              w="full"
            >
              <HStack justify="space-between" mb={6}>
                <HStack>
                  <Box p={2} bg="blue.100" borderRadius="lg">
                    <FiCalendar size={20} color="var(--chakra-colors-blue-500)" />
                  </Box>
                  <VStack align="start" gap={0}>
                    <Heading size="lg">Upcoming Events</Heading>
                    <Text fontSize="sm" color="gray.500">Next 7 days</Text>
                  </VStack>
                </HStack>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  colorPalette="blue"
                  onClick={handleViewAllEvents}
                >
                  View All <FiArrowRight style={{ marginLeft: '8px' }} />
                </Button>
              </HStack>

              {loading ? (
                <VStack gap={3}>
                  <Box w="full" h="4px" bg="blue.100" borderRadius="full">
                    <Box w="60%" h="full" bg="blue.500" borderRadius="full" />
                  </Box>
                  <Text>Loading events...</Text>
                </VStack>
              ) : (
                <VStack gap={4}>
                  {upcomingEvents.map((event) => (
                    <Box 
                      key={event.id} 
                      p={4} 
                      bg="gray.50" 
                      borderRadius="lg"
                      w="full"
                      _hover={{ bg: "blue.50", cursor: "pointer" }}
                      transition="all 0.2s"
                      onClick={() => handleEventClick(event.id)}
                    >
                      <HStack justify="space-between">
                        <VStack align="start" gap={1}>
                          <Text fontWeight="bold" color="blue.700">{event.title}</Text>
                          <HStack color="gray.500" fontSize="sm">
                            <FiMapPin size={14} />
                            <Text>{event.location}</Text>
                          </HStack>
                        </VStack>
                        <VStack align="end" gap={1}>
                          <Badge colorPalette="blue" size="sm">
                            {new Date(event.eventDate).toLocaleDateString()}
                          </Badge>
                          <HStack color="gray.400" fontSize="xs">
                            <FiClock size={12} />
                            <Text>{new Date(event.eventDate).toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}</Text>
                          </HStack>
                        </VStack>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              )}
            </Box>

            {/* Recent Lost Items - Enhanced */}
            <Box
              bg="white"
              p={6}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="gray.200"
              boxShadow="lg"
              w="full"
            >
              <HStack justify="space-between" mb={6}>
                <HStack>
                  <Box p={2} bg="orange.100" borderRadius="lg">
                    <FiPackage size={20} color="var(--chakra-colors-orange-500)" />
                  </Box>
                  <VStack align="start" gap={0}>
                    <Heading size="lg">Recent Lost Items</Heading>
                    <Text fontSize="sm" color="gray.500">Help find these items</Text>
                  </VStack>
                </HStack>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  colorPalette="orange"
                  onClick={handleViewAllLostItems}
                >
                  View All <FiArrowRight style={{ marginLeft: '8px' }} />
                </Button>
              </HStack>

              <VStack gap={3}>
                {recentLostItems.map((item) => (
                  <Box 
                    key={item.id} 
                    p={4} 
                    bg="gray.50" 
                    borderRadius="lg"
                    w="full"
                    _hover={{ bg: "orange.50", cursor: "pointer" }}
                    transition="all 0.2s"
                    onClick={() => handleLostItemClick(item.id)}
                  >
                    <HStack justify="space-between">
                      <VStack align="start" gap={1}>
                        <Text fontWeight="semibold">{item.itemName}</Text>
                        <HStack color="gray.500" fontSize="sm">
                          <FiMapPin size={14} />
                          <Text>{item.location}</Text>
                        </HStack>
                      </VStack>
                      <Badge 
                        colorPalette={item.status === 'PENDING' ? 'orange' : item.status === 'FOUND' ? 'green' : 'blue'}
                        size="sm"
                      >
                        {item.status}
                      </Badge>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>

          {/* Sidebar */}
          <VStack gap={6}>
            {/* High Priority Notices */}
            <Box
              bg="white"
              p={6}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="gray.200"
              boxShadow="lg"
              w="full"
            >
              <HStack justify="space-between" mb={4}>
                <HStack>
                  <Box p={2} bg="red.100" borderRadius="lg">
                    <FiBell size={20} color="var(--chakra-colors-red-500)" />
                  </Box>
                  <VStack align="start" gap={0}>
                    <Heading size="md">Priority Alerts</Heading>
                    <Text fontSize="sm" color="gray.500">Important updates</Text>
                  </VStack>
                </HStack>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  colorPalette="red"
                  onClick={handlePostNotice}
                >
                  View All <FiArrowRight style={{ marginLeft: '8px' }} />
                </Button>
              </HStack>

              <VStack gap={3}>
                {highPriorityNotices.map((notice) => (
                  <Box 
                    key={notice.id} 
                    p={3} 
                    bg="red.50" 
                    borderRadius="lg" 
                    borderLeftWidth="4px"
                    borderLeftColor="red.400"
                    w="full"
                    _hover={{ bg: "red.100", cursor: "pointer" }}
                    transition="all 0.2s"
                    onClick={handlePostNotice}
                  >
                    <VStack align="start" gap={2}>
                      <HStack justify="space-between" w="full">
                        <Badge colorPalette="red" size="sm">HIGH</Badge>
                        <Text fontSize="xs" color="gray.400">
                          {notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : ''}
                        </Text>
                      </HStack>
                      <Text fontSize="sm" fontWeight="semibold" color="red.700">
                        {notice.title}
                      </Text>
                      <Text fontSize="xs" color="red.600" lineClamp={2}>
                        {notice.description}
                      </Text>
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </Box>

            {/* Quick Actions */}
            <Box
              bg="white"
              p={6}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="gray.200"
              boxShadow="lg"
              w="full"
            >
              <VStack align="start" gap={4}>
                <HStack>
                  <Box p={2} bg="purple.100" borderRadius="lg">
                    <FiActivity size={20} color="var(--chakra-colors-purple-500)" />
                  </Box>
                  <Heading size="md">Quick Actions</Heading>
                </HStack>
                
                <VStack gap={2} w="full">
                  <Button 
                    w="full" 
                    colorPalette="blue" 
                    justifyContent="start"
                    onClick={handleCreateEvent}
                  >
                    <FiCalendar style={{ marginRight: '8px' }} /> Create Event
                  </Button>
                  <Button 
                    w="full" 
                    variant="outline" 
                    colorPalette="purple"
                    justifyContent="start"
                    onClick={handlePostNotice}
                  >
                    <FiBell style={{ marginRight: '8px' }} /> Post Notice
                  </Button>
                  <Button 
                    w="full" 
                    variant="outline" 
                    colorPalette="orange"
                    justifyContent="start"
                    onClick={handleReportLostItem}
                  >
                    <FiPackage style={{ marginRight: '8px' }} /> Report Lost Item
                  </Button>
                </VStack>
              </VStack>
            </Box>

            {/* Activity Feed */}
            <Box
              bg="white"
              p={6}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="gray.200"
              boxShadow="lg"
              w="full"
            >
              <VStack align="start" gap={4}>
                <HStack>
                  <Box p={2} bg="green.100" borderRadius="lg">
                    <FiTrendingUp size={20} color="var(--chakra-colors-green-500)" />
                  </Box>
                  <Heading size="md">Recent Activity</Heading>
                </HStack>
                
                <VStack gap={3} w="full">
                  <ActivityCard
                    icon={FiBookOpen}
                    title="New semester started"
                    description="Welcome to Fall 2024"
                    time="2 hours ago"
                    color="blue"
                  />
                  <ActivityCard
                    icon={FiUsers}
                    title="5 new students registered"
                    description="Computer Science Department"
                    time="5 hours ago"
                    color="green"
                  />
                  <ActivityCard
                    icon={FiEye}
                    title="Campus tour scheduled"
                    description="For prospective students"
                    time="1 day ago"
                    color="purple"
                  />
                </VStack>
              </VStack>
            </Box>
          </VStack>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
