import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './context/UserContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ApplicationList from './components/ApplicationList';
import ApplicationForm from './components/ApplicationForm';
import Applied from './pages/applications/Applied';
import Interview from './pages/applications/Interview';
import Offered from './pages/applications/Offered';
import Rejected from './pages/applications/Rejected';
import Profile from './components/Profile';
import About from './pages/About';
import Contact from './pages/Contact';

const AppRoutes = () => {
  const { userId, isLoading } = useUser();

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={userId ? <Navigate to="/applications" /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/login" 
        element={userId ? <Navigate to="/applications" /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={userId ? <Navigate to="/applications" /> : <Register />} 
      />
      <Route 
        path="/applications" 
        element={userId ? <ApplicationList /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/applications/new" 
        element={userId ? <ApplicationForm /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/applications/applied" 
        element={userId ? <Applied /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/applications/interview" 
        element={userId ? <Interview /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/applications/offered" 
        element={userId ? <Offered /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/applications/rejected" 
        element={userId ? <Rejected /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/profile" 
        element={userId ? <Profile /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/about" 
        element={<About />} 
      />
      <Route 
        path="/contact" 
        element={<Contact />} 
      />
    </Routes>
  );
};

export default AppRoutes; 