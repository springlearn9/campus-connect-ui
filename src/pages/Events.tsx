import {
  Box,
  Heading,
  Badge,
  Button,
  HStack,
  Input,
  Group,
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
import { FiSearch, FiPlus } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { eventService, type Event } from '../services/eventService';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    eventDate: '',
    location: '',
    status: 'ACTIVE'
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventService.getAllEvents();
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewEvent({
      title: '',
      description: '',
      eventDate: '',
      location: '',
      status: 'ACTIVE'
    });
  };

  const handleAddEvent = async () => {
    try {
      // Mock user ID for demo - in real app this would come from auth
      await eventService.createEvent(newEvent, 1);
      await fetchEvents(); // Refresh the list
      resetForm();
      setShowAddModal(false);
      alert('Event added successfully!');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Error adding event. Check console for details.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'green';
      case 'CANCELLED':
        return 'red';
      case 'COMPLETED':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || event.status === statusFilter;

    const matchesDate = (() => {
      if (!dateFilter) return true;
      const filterDate = new Date(dateFilter);
      const eventDate = event.eventDate ? new Date(event.eventDate) : null;
      if (!eventDate) return false;
      // show events on or after selected date
      return eventDate >= filterDate;
    })();

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <Box>
      <Heading mb={6} size="lg">
        Events
      </Heading>

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
                placeholder="Search events..." 
                pl={10}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Group>
            <select 
              value={statusFilter} 
              onChange={(e: any) => setStatusFilter(e.target.value)} 
              style={{
                maxWidth: '220px',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #E2E8F0',
                backgroundColor: 'white'
              }}>
              <option value="ALL">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
          </Stack>
          <DialogRoot open={showAddModal} onOpenChange={(e) => setShowAddModal(e.open)}>
            <DialogTrigger asChild>
              <Button colorPalette="brand">
                <FiPlus />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <Stack gap={4}>
                  <Input
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  />
                  <Textarea
                    placeholder="Event Description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  />
                  <Input
                    type="datetime-local"
                    placeholder="Event Date & Time"
                    value={newEvent.eventDate}
                    onChange={(e) => setNewEvent({...newEvent, eventDate: e.target.value})}
                  />
                  <Input
                    placeholder="Location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  />
                  <select
                    value={newEvent.status}
                    onChange={(e) => setNewEvent({...newEvent, status: e.target.value})}
                    style={{
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </Stack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline" onClick={() => { resetForm(); }}>
                    Cancel
                  </Button>
                </DialogActionTrigger>
                <Button colorPalette="brand" onClick={handleAddEvent}>
                  Add Event
                </Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
        </HStack>

        {loading ? (
          <Box>Loading events...</Box>
        ) : (
          <Box overflowX="auto">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Event</Table.ColumnHeader>
                  <Table.ColumnHeader>Date</Table.ColumnHeader>
                  <Table.ColumnHeader>Location</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredEvents.map((event) => (
                  <Table.Row key={event.id}>
                    <Table.Cell fontWeight="medium">{event.title}</Table.Cell>
                    <Table.Cell>{new Date(event.eventDate).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>{event.location}</Table.Cell>
                    <Table.Cell>
                      <Badge colorPalette={getStatusColor(event.status)}>
                        {event.status}
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

export default Events;
