import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        try {
          // Here you should have an endpoint to get user data from the token
          // For now, we'll just assume the token is valid if it exists
          // You might want to decode the token or make a request to /api/me
          setUser({ token });
        } catch (error) {
          console.error("Failed to fetch user", error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (email, senha) => {
    try {
      const response = await api.post('/auth/login', { email, senha });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser({ token });
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete api.defaults.headers.Authorization;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
