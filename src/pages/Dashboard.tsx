import {
  Box,
  Grid,
  Heading,
  Badge,
  Text,
  Flex,
} from '@chakra-ui/react';
import { Table } from '@chakra-ui/react';
import { FiUsers, FiBook, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import StatsCard from '../components/StatsCard';
import { students, courses, events, stats } from '../data/mockData';

const Dashboard = () => {
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
          title="Total Students"
          value={stats.totalStudents}
          icon={FiUsers}
          color="blue"
        />
        <StatsCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={FiBook}
          color="green"
        />
        <StatsCard
          title="Upcoming Events"
          value={stats.totalEvents}
          icon={FiCalendar}
          color="purple"
        />
        <StatsCard
          title="Avg Attendance"
          value={`${stats.averageAttendance}%`}
          icon={FiTrendingUp}
          color="orange"
        />
      </Grid>

      <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6} mb={8}>
        {/* Recent Students */}
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          boxShadow="sm"
        >
          <Heading size="md" mb={4}>
            Recent Students
          </Heading>
          <Box overflowX="auto">
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Department</Table.ColumnHeader>
                  <Table.ColumnHeader>Year</Table.ColumnHeader>
                  <Table.ColumnHeader>GPA</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {students.slice(0, 5).map((student) => (
                  <Table.Row key={student.id}>
                    <Table.Cell>{student.name}</Table.Cell>
                    <Table.Cell>{student.department}</Table.Cell>
                    <Table.Cell>{student.year}</Table.Cell>
                    <Table.Cell>{student.gpa.toFixed(2)}</Table.Cell>
                    <Table.Cell>
                      <Badge colorPalette={student.status === 'Active' ? 'green' : 'red'}>
                        {student.status}
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Box>

        {/* Course Enrollment */}
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          boxShadow="sm"
        >
          <Heading size="md" mb={4}>
            Course Enrollment
          </Heading>
          <Box>
            {courses.slice(0, 5).map((course) => {
              const percentage = (course.enrolled / course.capacity) * 100;
              return (
                <Box key={course.id} mb={4}>
                  <Flex justifyContent="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="medium">
                      {course.code} - {course.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {course.enrolled}/{course.capacity}
                    </Text>
                  </Flex>
                  <Box
                    w="full"
                    h="8px"
                    bg="gray.200"
                    borderRadius="full"
                    overflow="hidden"
                  >
                    <Box
                      h="full"
                      w={`${percentage}%`}
                      bg={percentage > 90 ? 'red.500' : percentage > 70 ? 'orange.500' : 'green.500'}
                      transition="width 0.3s"
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Grid>

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

export default Dashboard;
