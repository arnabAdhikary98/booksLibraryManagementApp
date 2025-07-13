import { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api/axiosClient';
import { AuthContext } from './AuthContext';

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    setLoading(true);
    axios.get('/books')
      .then(res => setBooks(res.data))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <BooksContext.Provider value={{ books, loading }}>
      {children}
    </BooksContext.Provider>
  );
};
