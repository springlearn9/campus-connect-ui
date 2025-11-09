import {
  Box,
  Heading,
  Button,
  HStack,
  Input,
  Group,
  Text,
  Flex,
} from '@chakra-ui/react';
import { Table } from '@chakra-ui/react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { courses } from '../data/mockData';

const Courses = () => {
  return (
    <Box>
      <Heading mb={6} size="lg">
        Courses
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
            <Input placeholder="Search courses..." pl={10} />
          </Group>
          <Button colorPalette="brand">
            <FiPlus />
            Add Course
          </Button>
        </HStack>

        <Box overflowX="auto">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Code</Table.ColumnHeader>
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader>Instructor</Table.ColumnHeader>
                <Table.ColumnHeader>Credits</Table.ColumnHeader>
                <Table.ColumnHeader>Enrollment</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {courses.map((course) => {
                const percentage = (course.enrolled / course.capacity) * 100;
                return (
                  <Table.Row key={course.id}>
                    <Table.Cell fontWeight="medium">{course.code}</Table.Cell>
                    <Table.Cell>{course.name}</Table.Cell>
                    <Table.Cell>{course.instructor}</Table.Cell>
                    <Table.Cell>{course.credits}</Table.Cell>
                    <Table.Cell>
                      <Box minW="200px">
                        <Flex justifyContent="space-between" mb={1}>
                          <Text fontSize="sm">
                            {course.enrolled}/{course.capacity}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            {percentage.toFixed(0)}%
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
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        </Box>
      </Box>
    </Box>
  );
};

export default Courses;
