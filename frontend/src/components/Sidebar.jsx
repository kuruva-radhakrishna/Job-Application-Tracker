import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BlockIcon from '@mui/icons-material/Block';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const DRAWER_WIDTH = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const mainMenuItems = [
    {
      text: 'ALL Applications',
      icon: <HomeIcon />,
      path: '/applications'
    },
    {
      text: 'New Application',
      icon: <AddIcon />,
      path: '/applications/new'
    },
  ];

  const statusMenuItems = [
    {
      text: 'Applied',
      icon: <SendIcon />,
      path: '/applications/applied'
    },
    {
      text: 'Interview',
      icon: <PeopleIcon />,
      path: '/applications/interview'
    },
    {
      text: 'Offered',
      icon: <EmojiEventsIcon />,
      path: '/applications/offered'
    },
    {
      text: 'Rejected',
      icon: <BlockIcon />,
      path: '/applications/rejected'
    },
  ];

  const infoMenuItems = [
    {
      text: 'About Us',
      icon: <InfoIcon />,
      path: '/about'
    },
    {
      text: 'Contact Us',
      icon: <ContactMailIcon />,
      path: '/contact'
    },
  ];

  return (
    <Box
      component="nav"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#111827',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 64, // Height of the header
        color: theme.palette.text.primary,
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      <List sx={{ pt: 0 }}>
        {mainMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                py: 1.5,
                '&:hover': {
                  bgcolor: theme.palette.action.hover,
                },
                '&.Mui-selected': {
                  bgcolor: theme.palette.mode === 'light' 
                    ? 'rgba(79, 70, 229, 0.08)'
                    : 'rgba(99, 102, 241, 0.15)',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'light'
                      ? 'rgba(79, 70, 229, 0.12)'
                      : 'rgba(99, 102, 241, 0.2)',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path 
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
                minWidth: 40 
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  sx: { 
                    fontSize: '0.9rem',
                    color: location.pathname === item.path 
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                    fontWeight: location.pathname === item.path ? 600 : 400
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ borderColor: theme.palette.divider, my: 1 }} />
      
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Application Status
        </Typography>
      </Box>

      <List>
        {statusMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                py: 1.5,
                '&:hover': {
                  bgcolor: theme.palette.action.hover,
                },
                '&.Mui-selected': {
                  bgcolor: theme.palette.mode === 'light' 
                    ? 'rgba(79, 70, 229, 0.08)'
                    : 'rgba(99, 102, 241, 0.15)',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'light'
                      ? 'rgba(79, 70, 229, 0.12)'
                      : 'rgba(99, 102, 241, 0.2)',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path 
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
                minWidth: 40 
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  sx: { 
                    fontSize: '0.9rem',
                    color: location.pathname === item.path 
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                    fontWeight: location.pathname === item.path ? 600 : 400
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: theme.palette.divider, my: 1 }} />
      
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          More Information
        </Typography>
      </Box>

      <List>
        {infoMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                py: 1.5,
                '&:hover': {
                  bgcolor: theme.palette.action.hover,
                },
                '&.Mui-selected': {
                  bgcolor: theme.palette.mode === 'light' 
                    ? 'rgba(79, 70, 229, 0.08)'
                    : 'rgba(99, 102, 241, 0.15)',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'light'
                      ? 'rgba(79, 70, 229, 0.12)'
                      : 'rgba(99, 102, 241, 0.2)',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path 
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
                minWidth: 40 
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  sx: { 
                    fontSize: '0.9rem',
                    color: location.pathname === item.path 
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                    fontWeight: location.pathname === item.path ? 600 : 400
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar; 