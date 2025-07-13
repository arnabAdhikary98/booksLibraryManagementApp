import { useContext } from 'react';
import MyBookCard from '../components/MyBookCard';
import { MyBooksContext } from '../context/MyBooksContext';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Center,
  Image,
  Button,
  Spinner,
  VStack
} from '@chakra-ui/react';

function MyBooks() {
  const { myBooks, loading } = useContext(MyBooksContext);

  return (
    <Box minH="100vh" bgGradient="linear(to-r, blue.50 0%, green.50 100%)" py={{ base: 4, md: 8 }}>
      <Box maxW="1100px" mx="auto" bg="white" borderRadius="xl" boxShadow="lg" px={{ base: 2, md: 8 }} py={8}>
        <VStack spacing={2} mb={8}>
          <Heading as="h2" size="xl" color="blue.600" fontWeight="extrabold">My Books Collection</Heading>
          <Text fontSize="lg" color="gray.700" textAlign="center">
            All your favorite books in one place. Update status and rating to track your reading journey!
          </Text>
        </VStack>
        {loading ? (
          <Center py={12}><Spinner size="xl" color="blue.500" /></Center>
        ) : myBooks.length === 0 ? (
          <Center py={12} flexDirection="column">
            <Image src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="Empty" boxSize="70px" opacity={0.7} mb={4} />
            <Text fontSize="xl" fontWeight="bold" color="gray.500" mb={2}>No books added yet</Text>
            <Text color="gray.400" mb={4}>Go to the Home page to add your favorites!</Text>
            <Button as="a" href="/" colorScheme="blue" size="lg">Browse Books</Button>
          </Center>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8} maxW="100%">
            {myBooks.map(mybook => (
              <MyBookCard key={mybook._id} mybook={mybook} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}

export default MyBooks;
// This page displays the user's collection of books.