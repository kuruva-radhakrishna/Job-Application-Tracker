import React, { useEffect, useState } from 'react';
import {  AppBar,  Toolbar,  Typography,  Box,  Button,  Avatar,  Divider,  IconButton,  useTheme, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import {  Brightness4 as DarkModeIcon,  Brightness7 as LightModeIcon,} from '@mui/icons-material';
import { useUser } from '../context/UserContext';
import { useColorMode } from '../theme/ThemeContext';
import axios from 'axios';

const API_BASE_URL = "https://job-application-tracker-backend-z59w.onrender.com/api";

const Header = () => {
  const navigate = useNavigate();
  const { userId, logout } = useUser();
  const [userData, setUserData] = useState(null);
  const theme = useTheme();
  const { toggleColorMode, mode } = useColorMode();

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await axios.get(`${API_BASE_URL}/users/profile`, {
            withCredentials: true
          });
          console.log('User data response:', response.data);
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    };

    fetchUserData();
  }, [userId]);

  // Debug log when userData changes
  useEffect(() => {
    console.log('Current userData:', userData);
  }, [userData]);

  const handleLogout = async () => {
    try {
      await logout();
      setUserData(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: theme.palette.mode === 'light' ? theme.palette.background.paper : '#1F2937',
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', height: 64, px: 2 }}>
        {/* Left side - Logo and Title */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            cursor: 'pointer' 
          }}
          onClick={() => navigate('/')}
        >
          <WorkIcon sx={{ 
            color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main, 
            fontSize: 28 
          }} />
          <Typography 
            variant="h6" 
            sx={{ 
              color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
              fontWeight: 500 
            }}
          >
            Student Job Tracker
          </Typography>
        </Box>

        {/* Right side - Authentication */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {userId ? (
            <>
              {userData && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
                      fontSize: '1rem'
                    }}
                  >
                    Welcome, {userData.name}
                  </Typography>
                  <Avatar 
                    src={userData.profilePic} 
                    alt={userData.name}
                    sx={{ 
                      width: 36, 
                      height: 36,
                      bgcolor: '#6366f1',
                      cursor: 'pointer',
                      '&:hover': { opacity: 0.8 }
                    }}
                    onClick={() => navigate('/profile')}
                  >
                    {!userData.profilePic && userData.name?.charAt(0)}
                  </Avatar>
                  <IconButton
                    onClick={toggleColorMode}
                    size="small"
                    sx={{
                      color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
                      bgcolor: 'transparent',
                      '&:hover': {
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                      }
                    }}
                  >
                    {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                  <Button 
                    color="inherit" 
                    onClick={handleLogout}
                    sx={{ 
                      color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
                      textTransform: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                      }
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              )}
            </>
          ) : (
            <>
              <IconButton
                onClick={toggleColorMode}
                sx={{
                  color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <Button 
                color="inherit" 
                onClick={() => navigate('/login')}
                sx={{ 
                  color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/register')}
                sx={{ 
                  color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;