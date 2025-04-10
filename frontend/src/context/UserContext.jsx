import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'https://job-application-tracker-backend-z59w.onrender.com/';
axios.defaults.withCredentials = true;

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/auth/current-user');
      if (response.data && response.data._id) {
        console.log(response.data);
        setUserId(response.data._id);
        
      } else {
        setUserId(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUserId(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUserId(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId, isLoading, checkAuth, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export default UserContext; 