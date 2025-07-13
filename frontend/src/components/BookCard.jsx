import axios from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MyBooksContext } from '../context/MyBooksContext';
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  useToast
} from '@chakra-ui/react';

function BookCard({ book }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { fetchMyBooks } = useContext(MyBooksContext);

  const toast = useToast();
  const handleAdd = () => {
    if (!user) {
      toast({
        title: 'Please login to add books.',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
      navigate('/login');
      return;
    }
    axios.post(`/mybooks/${book._id}`)
      .then(() => {
        toast({
          title: 'Book added to My Books!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        fetchMyBooks();
      })
      .catch(() => {
        toast({
          title: 'Failed to add book. Please try again.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  };

  // Fallback image for missing/invalid images
  const handleImgError = (e) => {
    e.target.src = 'https://placehold.co/220x160?text=No+Image';
    e.target.onerror = null;
  };

  return (
    <Box
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      minW="220px"
      maxW="260px"
      mx="auto"
      minH="340px"
    >
      <Image
        src={book.coverImage || 'https://placehold.co/220x160?text=No+Image'}
        alt={book.title}
        borderRadius="md"
        boxSize="220px"
        objectFit="cover"
        mb={3}
        bg="gray.50"
        onError={handleImgError}
      />
      <Heading as="h2" size="md" color="blue.600" mb={1} textAlign="center" minH="48px">
        {book.title}
      </Heading>
      <Text color="gray.600" fontSize="md" mb={3} textAlign="center" minH="24px">
        {book.author}
      </Text>
      <Button
        colorScheme="blue"
        onClick={handleAdd}
        mt="auto"
        w="100%"
        fontWeight="bold"
      >
        Want to Read
      </Button>
    </Box>
  );
}

export default BookCard;
