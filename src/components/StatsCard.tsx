import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import type { IconType } from 'react-icons';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  color: string;
}

const StatsCard = ({ title, value, icon, color }: StatsCardProps) => {
  return (
    <Box
      p={6}
      bg="white"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.200"
      boxShadow="sm"
      _hover={{ boxShadow: 'md', transform: 'translateY(-2px)' }}
      transition="all 0.2s"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontSize="sm" color="gray.500" mb={1}>
            {title}
          </Text>
          <Text fontSize="3xl" fontWeight="bold">
            {value}
          </Text>
        </Box>
        <Box
          p={3}
          bg={`${color}.100`}
          borderRadius="lg"
        >
          <Icon boxSize={8} color={`${color}.500`}>
            {icon({})}
          </Icon>
        </Box>
      </Flex>
    </Box>
  );
};

export default StatsCard;
