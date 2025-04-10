import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ApplicationList from './components/applications/ApplicationList';
import ApplicationForm from './components/applications/ApplicationForm';
import Navbar from './components/layout/Navbar';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/auth/current-user', {
        withCredentials: true
      });
      if (response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} user={user} />
        <div className="container mt-4">
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? (
                  <Navigate to="/applications" />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? (
                  <Navigate to="/applications" />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                )
              } 
            />
            <Route 
              path="/register" 
              element={
                isAuthenticated ? (
                  <Navigate to="/applications" />
                ) : (
                  <Register setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                )
              } 
            />
            <Route 
              path="/applications" 
              element={
                isAuthenticated ? (
                  <ApplicationList />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route 
              path="/applications/new" 
              element={
                isAuthenticated ? (
                  <ApplicationForm />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 