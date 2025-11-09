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
import { students } from '../data/mockData';

const Students = () => {
  return (
    <Box>
      <Heading mb={6} size="lg">
        Students
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
            <Input placeholder="Search students..." pl={10} />
          </Group>
          <Button colorPalette="brand">
            <FiPlus />
            Add Student
          </Button>
        </HStack>

        <Box overflowX="auto">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>ID</Table.ColumnHeader>
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader>Email</Table.ColumnHeader>
                <Table.ColumnHeader>Department</Table.ColumnHeader>
                <Table.ColumnHeader>Year</Table.ColumnHeader>
                <Table.ColumnHeader>GPA</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {students.map((student) => (
                <Table.Row key={student.id}>
                  <Table.Cell>{student.id}</Table.Cell>
                  <Table.Cell fontWeight="medium">{student.name}</Table.Cell>
                  <Table.Cell>{student.email}</Table.Cell>
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
    </Box>
  );
};

export default Students;
