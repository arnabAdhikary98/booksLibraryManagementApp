import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import axios from '../api/axiosClient';
import { AuthContext } from './AuthContext';

export const MyBooksContext = createContext();

export const MyBooksProvider = ({ children }) => {
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBooks = useCallback(() => {
    setLoading(true);
    axios.get('/mybooks')
      .then(res => setMyBooks(res.data))
      .finally(() => setLoading(false));
  }, []);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user) fetchMyBooks();
    else setMyBooks([]);
  }, [user, fetchMyBooks]);

  const updateStatus = async (bookId, status) => {
    await axios.patch(`/mybooks/${bookId}/status`, { status });
    fetchMyBooks();
  };

  const updateRating = async (bookId, rating) => {
    await axios.patch(`/mybooks/${bookId}/rating`, { rating });
    fetchMyBooks();
  };

  return (
    <MyBooksContext.Provider value={{ myBooks, loading, updateStatus, updateRating, fetchMyBooks }}>
      {children}
    </MyBooksContext.Provider>
  );
};
