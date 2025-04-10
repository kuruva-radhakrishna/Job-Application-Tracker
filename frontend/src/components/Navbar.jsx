import {   AppBar,   Toolbar,   Typography,   Button,   IconButton,  Box,  useTheme} from '@mui/material';
import {   Brightness4 as DarkModeIcon,  Brightness7 as LightModeIcon,  Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useColorMode } from '../theme/ThemeContext';

const Navbar = () => {
  const theme = useTheme();
  const { toggleColorMode, mode } = useColorMode();

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: 'none'
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1,
            textDecoration: 'none',
            color: theme.palette.text.primary,
            fontWeight: 600
          }}
        >
          Job Application Tracker
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <IconButton 
            onClick={toggleColorMode} 
            color="inherit"
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
            component={Link} 
            to="/login" 
            variant="outlined"
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                backgroundColor: theme.palette.action.hover
              }
            }}
          >
            Login
          </Button>
          <Button 
            component={Link} 
            to="/register" 
            variant="contained"
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              color: 'white',
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`
              }
            }}
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 