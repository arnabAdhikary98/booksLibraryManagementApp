
import { AuthProvider } from './context/AuthContext';
import { BooksProvider } from './context/BooksContext';
import { MyBooksProvider } from './context/MyBooksContext';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <AuthProvider>
      <BooksProvider>
        <MyBooksProvider>
          <App />
        </MyBooksProvider>
      </BooksProvider>
    </AuthProvider>
  </ChakraProvider>
);
