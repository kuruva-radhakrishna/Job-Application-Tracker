import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://job-application-tracker-backend-z59w.onrender.com/api';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/current-user`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // console.log('Auth check response:', response);
      if (response.data && response.data._id) {
        // console.log('Setting user ID:', response.data._id);
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
      await axios.post(`${API_URL}/auth/logout`, {}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
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