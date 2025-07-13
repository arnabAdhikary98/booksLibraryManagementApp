
import { useContext } from 'react';
import { MyBooksContext } from '../context/MyBooksContext';
import {
  Box,
  Image,
  Heading,
  Text,
  Select,
  HStack,
  IconButton,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

function MyBookCard({ mybook }) {
  const { updateStatus, updateRating } = useContext(MyBooksContext);

  if (!mybook.bookId) {
    return (
      <Box bg="gray.50" borderRadius="lg" boxShadow="md" p={4} minW="220px" maxW="260px" mx="auto" minH="340px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Image src="https://placehold.co/220x160?text=No+Image" alt="No book data" borderRadius="md" boxSize="220px" objectFit="cover" mb={3} />
        <Heading as="h2" size="md" color="gray.600" mb={1} textAlign="center">Unknown Title</Heading>
        <Text color="gray.500" fontSize="md" mb={1} textAlign="center">Unknown Author</Text>
        <Text color="red.400" fontSize="sm" textAlign="center">Book data missing</Text>
      </Box>
    );
  }

  return (
    <Box bg="white" borderRadius="lg" boxShadow="md" p={4} minW="220px" maxW="260px" mx="auto" minH="340px" display="flex" flexDirection="column" alignItems="center">
      <Image
        src={mybook.bookId.coverImage || "https://placehold.co/220x160?text=No+Image"}
        alt={mybook.bookId.title || "No Title"}
        borderRadius="md"
        boxSize="220px"
        objectFit="cover"
        mb={3}
        bg="gray.50"
      />
      <VStack spacing={1} align="center" w="100%" mb={2}>
        <Heading as="h2" size="md" color="blue.600" textAlign="center" minH="48px" fontWeight="bold">
          {mybook.bookId.title || "Unknown Title"}
        </Heading>
        <Text color="gray.600" fontSize="sm" textAlign="center" minH="24px">
          {mybook.bookId.author || "Unknown Author"}
        </Text>
      </VStack>
      <Box w="100%" mb={2}>
        <Text fontSize="sm" color="gray.500" mb={1} fontWeight="medium">Status</Text>
        <Select
          value={mybook.status}
          onChange={e => updateStatus(mybook.bookId._id, e.target.value)}
          size="sm"
          fontWeight="bold"
          bg={useColorModeValue('gray.100', 'gray.700')}
        >
          <option>Want to Read</option>
          <option>Currently Reading</option>
          <option>Read</option>
        </Select>
      </Box>
      <Box w="100%" mt="auto">
        <Text fontSize="sm" color="gray.500" mb={1} fontWeight="medium">Rating</Text>
        <HStack spacing={1} justify="center">
          {[1, 2, 3, 4, 5].map(n => (
            <IconButton
              key={n}
              icon={<StarIcon />}
              aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
              size="sm"
              variant={n <= mybook.rating ? 'solid' : 'outline'}
              colorScheme={n <= mybook.rating ? 'yellow' : 'gray'}
              onClick={() => updateRating(mybook.bookId._id, n)}
            />
          ))}
        </HStack>
      </Box>
    </Box>
  );
}

export default MyBookCard;
