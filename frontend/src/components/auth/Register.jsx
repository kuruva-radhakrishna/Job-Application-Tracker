import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

// Common styles for forms
const commonStyles = {
  textField: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#FFFFFF',
      '&:hover fieldset': {
        borderColor: '#D0D5DD',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1570EF',
      },
      '& fieldset': {
        borderColor: '#D0D5DD',
      },
      '& input': {
        backgroundColor: '#FFFFFF',
      },
      '& input:-webkit-autofill': {
        '-webkit-box-shadow': '0 0 0 100px #FFFFFF inset',
        '-webkit-text-fill-color': '#101828',
      },
      '& input:-webkit-autofill:hover': {
        '-webkit-box-shadow': '0 0 0 100px #FFFFFF inset',
      },
      '& input:-webkit-autofill:focus': {
        '-webkit-box-shadow': '0 0 0 100px #FFFFFF inset',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#344054',
      '&.Mui-focused': {
        color: '#1570EF',
      },
    },
    '& .MuiOutlinedInput-input': {
      color: '#101828',
      '&::placeholder': {
        color: '#667085',
        opacity: 1,
      },
    },
  },
  button: {
    backgroundColor: '#1570EF',
    color: '#FFFFFF',
    textTransform: 'none',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#1570EF',
      opacity: 0.9,
    },
    '&:disabled': {
      backgroundColor: '#1570EF',
      opacity: 0.5,
    },
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #D0D5DD',
    boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
  },
};

const Register = () => {
  const navigate = useNavigate();
  const { setUserId } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://job-application-tracker-backend-z59w.onrender.com/api/auth/register',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data && response.data._id) {
        setUserId(response.data._id);
        navigate('/applications');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography 
          component="h1" 
          variant="h5" 
          sx={{ 
            mb: 3, 
            color: '#101828',
            fontWeight: 600,
            fontSize: '24px',
          }}
        >
          Register
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              width: '100%', 
              mb: 2,
              backgroundColor: '#FEF3F2',
              color: '#B42318',
              '& .MuiAlert-icon': {
                color: '#B42318',
              },
            }}
          >
            {error}
          </Alert>
        )}

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ 
            width: '100%',
            ...commonStyles.formContainer,
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            sx={commonStyles.textField}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            sx={commonStyles.textField}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            sx={commonStyles.textField}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              ...commonStyles.button,
              mt: 3,
              mb: 2,
              height: '44px',
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link
              to="/login"
              style={{
                color: '#1570EF',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Already have an account? Login
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Register; 