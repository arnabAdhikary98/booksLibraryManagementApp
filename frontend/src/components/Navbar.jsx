import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  Box,
  Flex,
  Button,
  Avatar,
  Text,
  Link,
  Spacer,
  HStack,
  useColorModeValue
} from '@chakra-ui/react';


function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Box as="nav" w="100%" bg={useColorModeValue('blue.50', 'gray.900')} boxShadow="sm" px={0} py={0} position="sticky" top={0} zIndex={100}>
      <Flex maxW="1200px" mx="auto" align="center" justify="space-between" px={{ base: 2, md: 6 }} py={2}>
        <HStack spacing={4} align="center">
          <Box as={RouterLink} to="/">
            <img src="/library.png" alt="Logo" style={{ height: 32, width: 32, marginRight: 8 }} />
          </Box>
          <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold" color="blue.600" _hover={{ color: 'blue.800' }}>
            My Library
          </Link>
          {user && (
            <Link as={RouterLink} to="/mybooks" fontWeight={700} fontSize="md" color="blue.600" _hover={{ color: 'blue.800' }}>
              My Books
            </Link>
          )}
        </HStack>
        <Spacer />
        <HStack spacing={4} align="center">
          {user ? (
            <>
              <Flex align="center" bg="blue.100" borderRadius="full" px={3} py={1} gap={2}>
                <Avatar size="sm" name={user.email} bg="blue.600" color="white" />
                <Text fontWeight="medium" color="blue.800" fontSize="md">{user.email}</Text>
              </Flex>
              <Button colorScheme="blue" variant="solid" onClick={handleLogout} fontWeight="bold">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button as={RouterLink} to="/login" colorScheme="blue" variant="solid" fontWeight="bold">
                Login
              </Button>
              <Button as={RouterLink} to="/register" colorScheme="green" variant="solid" fontWeight="bold">
                Register
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;
