import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AppRoutes from './AppRoutes';
import { Box } from '@mui/material';
import { useUser } from './context/UserContext';
import { ThemeProviderWrapper } from './theme/ThemeContext';
import { useEffect } from 'react';

const DRAWER_WIDTH = 240;

const AppContent = () => {
  const { userId } = useUser();
  useEffect(() => {
    console.log('userId in AppContent:', userId);
  }, [userId]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header />
      {userId && <Sidebar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: '64px', // Header height
          ml: userId ? `${DRAWER_WIDTH}px` : 0, // Sidebar width when authenticated
          p: 3,
          width: userId ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
          minHeight: 'calc(100vh - 64px)',
          transition: theme => theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          '& > *': {
            maxWidth: '100%',
          }
        }}
      >
        <AppRoutes />
      </Box>
    </Box>
  );
};

function App() {
  return (
    <ThemeProviderWrapper>
      <UserProvider>
        <Router>
          <AppContent />
        </Router>
      </UserProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
