import { createContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const res = await axiosClient.get('/auth/me');
      setUser(res.data.user);
    } catch { setUser(null); }
  };

  useEffect(() => { fetchCurrentUser(); }, []);

  const login = async (email, password) => {
    await axiosClient.post('/auth/login', { email, password });
    await fetchCurrentUser();
  };

  const register = async (email, password) => {
    await axiosClient.post('/auth/register', { email, password });
    await fetchCurrentUser();
  };

  const logout = async () => {
    await axiosClient.get('/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
