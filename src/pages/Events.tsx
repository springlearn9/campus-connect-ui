import {
  Box,
  Heading,
  Badge,
  Button,
  HStack,
  Input,
  Group,
} from '@chakra-ui/react';
import { Table } from '@chakra-ui/react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { events } from '../data/mockData';

const Events = () => {
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
          <Group maxW="400px">
            <Box pointerEvents="none" position="absolute" left={3} top="50%" transform="translateY(-50%)">
              <FiSearch color="gray" />
            </Box>
            <Input placeholder="Search events..." pl={10} />
          </Group>
          <Button colorPalette="brand">
            <FiPlus />
            Add Event
          </Button>
        </HStack>

        <Box overflowX="auto">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Event</Table.ColumnHeader>
                <Table.ColumnHeader>Date</Table.ColumnHeader>
                <Table.ColumnHeader>Location</Table.ColumnHeader>
                <Table.ColumnHeader>Attendees</Table.ColumnHeader>
                <Table.ColumnHeader>Type</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {events.map((event) => (
                <Table.Row key={event.id}>
                  <Table.Cell fontWeight="medium">{event.title}</Table.Cell>
                  <Table.Cell>{new Date(event.date).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{event.location}</Table.Cell>
                  <Table.Cell>{event.attendees}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorPalette={
                        event.type === 'Academic'
                          ? 'blue'
                          : event.type === 'Sports'
                          ? 'green'
                          : event.type === 'Cultural'
                          ? 'purple'
                          : 'orange'
                      }
                    >
                      {event.type}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      </Box>
    </Box>
  );
};

export default Events;
