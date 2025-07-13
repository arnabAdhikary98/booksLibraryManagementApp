import { useContext } from 'react';
import BookCard from '../components/BookCard';
import { BooksContext } from '../context/BooksContext';
import { Box, Heading, Text, Image, SimpleGrid, Spinner, Center } from '@chakra-ui/react';

function Home() {
  const { books, loading } = useContext(BooksContext);

  return (
    <Box>
      <Box
        bgGradient="linear(to-r, blue.50 0%, green.50 100%)"
        borderRadius="xl"
        boxShadow="md"
        maxW="900px"
        mx="auto"
        mt={8}
        mb={8}
        p={{ base: 4, md: 8 }}
        textAlign="center"
      >
        <Heading as="h1" size="2xl" color="blue.600" mb={2} fontWeight="extrabold">
          Welcome to My Library
        </Heading>
        <Text fontSize="xl" color="gray.700" mb={4}>
          Browse, add, and manage your favorite books. Register or login to start building your personal collection!
        </Text>
        <Image
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
          alt="Library"
          borderRadius="lg"
          boxShadow="md"
          h={{ base: '120px', md: '160px' }}
          mx="auto"
          objectFit="cover"
        />
      </Box>
      {loading ? (
        <Center py={12}><Spinner size="xl" color="blue.500" /></Center>
      ) : (
        <Box maxW="1200px" mx="auto" px={{ base: 2, md: 6 }}>
          {books.length === 0 ? (
            <Center py={12}><Text color="gray.500">No books available.</Text></Center>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8}>
              {books.map(book => (
                <BookCard key={book._id} book={book} />
              ))}
            </SimpleGrid>
          )}
        </Box>
      )}
    </Box>
  );
}

export default Home;
// This is the main page of the application where users can view a list of books.