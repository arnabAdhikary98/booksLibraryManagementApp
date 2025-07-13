import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  Box,
  Button,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: 'Login successful.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      navigate('/');
    } catch {
      toast({
        title: 'Invalid credentials.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <Box bg="white" p={8} borderRadius="lg" boxShadow="lg" minW={{ base: '90vw', sm: '400px' }}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            <Heading as="h2" size="lg" textAlign="center" color="blue.600">Login</Heading>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </FormControl>
            <Button colorScheme="blue" type="submit" size="lg" fontWeight="bold" w="100%">Login</Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
// This is the Login page component for the frontend of the application.