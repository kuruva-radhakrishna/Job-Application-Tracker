import React, { useEffect, useState } from 'react';
import {  AppBar,  Toolbar,  Typography,  Box,  Button,  Avatar,  Divider,  IconButton,  useTheme, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import {  Brightness4 as DarkModeIcon,  Brightness7 as LightModeIcon,} from '@mui/icons-material';
import { useUser } from '../context/UserContext';
import { useColorMode } from '../theme/ThemeContext';
import axios from 'axios';

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
          const response = await axios.get('/api/users/profile');
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [userId]);

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
        borderBottom: `1px solid ${theme.palette.divider}`
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
          <WorkIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
          <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
            Student Job Tracker
          </Typography>
        </Box>

        {/* Right side - Authentication */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {userId ? (
            <>
              {userData && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                    Welcome, {userData.name}
                  </Typography>
                  <IconButton
                    onClick={toggleColorMode}
                    sx={{
                      color: theme.palette.text.primary,
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover
                      }
                    }}
                  >
                    {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                  <Divider orientation="vertical" flexItem sx={{ bgcolor: theme.palette.divider, height: 24 }} />
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 1,
                      cursor: 'pointer',
                      '&:hover': { opacity: 0.8 }
                    }}
                    onClick={() => navigate('/profile')}
                  >
                    <Avatar 
                      src={userData.profilePic} 
                      alt={userData.name}
                      sx={{ 
                        width: 32, 
                        height: 32,
                        bgcolor: theme.palette.primary.main,
                        fontSize: '0.875rem'
                      }}
                    >
                      {userData.name?.charAt(0)}
                    </Avatar>
                  </Box>
                </Box>
              )}
              <Button 
                color="inherit" 
                onClick={handleLogout}
                sx={{ 
                  color: theme.palette.text.primary,
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 2,
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: theme.palette.action.hover
                  }
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <IconButton
                onClick={toggleColorMode}
                sx={{
                  color: theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover
                  }
                }}
              >
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <Button 
                color="inherit" 
                onClick={() => navigate('/login')}
                sx={{ 
                  color: theme.palette.text.primary,
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 2,
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: theme.palette.action.hover
                  }
                }}
              >
                Login
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/register')}
                sx={{ 
                  color: theme.palette.text.primary,
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 2,
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: theme.palette.action.hover
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