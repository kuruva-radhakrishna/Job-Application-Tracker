import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Alert,
  useTheme,
} from '@mui/material';
import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import {
  Business,
  Work,
  Link as LinkIcon,
  LocationOn,
  AttachMoney,
  CalendarToday,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axios from 'axios';


const ApplicationForm = () => {
  const { userId } = useUser(); // ✅ Get userId from context
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    applicationDate: '',
    location: '',
    salary: '',
    link: '',
    status: 'Applied',
  });
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userId) {
      alert('User not authenticated. Please log in.');
      return;
    }
  
    
    try {
      const response = await axios.post('https://job-application-tracker-backend-z59w.onrender.com/api/applications/', 
        {
        formData,
        withCredentials : true,
        }
      );
  
      // Axios only reaches here if the request was successful
      navigate('/applications');
    } catch (error) {
      console.error('Error creating application:', error);
      
      // Extract message if available
      const message = error.response?.data?.message || 'Failed to create application. Please try again.';
      alert(message);
    }
  };
  

  const commonStyles = {
    textField: {
      "& .MuiOutlinedInput-root": {
        backgroundColor: isDark ? "rgba(30, 41, 59, 0.8)" : "#FFFFFF",
        "& fieldset": {
          borderColor: isDark ? "rgba(148, 163, 184, 0.2)" : "#D0D5DD",
        },
        "&:hover fieldset": {
          borderColor: isDark ? "rgba(148, 163, 184, 0.3)" : "#D0D5DD",
        },
        "&.Mui-focused fieldset": {
          borderColor: isDark ? "#818CF8" : "#1570EF",
        },
        "& input": {
          backgroundColor: "transparent",
          color: isDark ? "#F1F5F9" : "#101828",
        },
        // Enhanced autofill handling for both modes
        "& input:-webkit-autofill": {
          WebkitBoxShadow: isDark 
            ? "0 0 0 1000px rgba(30, 41, 59, 0.8) inset" 
            : "0 0 0 1000px #FFFFFF inset",
          boxShadow: isDark 
            ? "0 0 0 1000px rgba(30, 41, 59, 0.8) inset" 
            : "0 0 0 1000px #FFFFFF inset",
          WebkitTextFillColor: isDark ? "#F1F5F9" : "#101828",
          caretColor: isDark ? "#F1F5F9" : "#101828",
          transition: "background-color 5000s ease-in-out 0s",
          borderRadius: "inherit",
        },
        // Specific fixes for Edge/Chrome and their autofill animations
        "& input:-webkit-autofill:hover, & input:-webkit-autofill:focus": {
          WebkitBoxShadow: isDark 
            ? "0 0 0 1000px rgba(30, 41, 59, 0.8) inset" 
            : "0 0 0 1000px #FFFFFF inset",
          boxShadow: isDark 
            ? "0 0 0 1000px rgba(30, 41, 59, 0.8) inset" 
            : "0 0 0 1000px #FFFFFF inset",
        },
      },
      "& .MuiInputLabel-root": {
        color: isDark ? "#94A3B8" : "#344054",
        "&.Mui-focused": {
          color: isDark ? "#818CF8" : "#1570EF",
        },
      },
      "& .MuiOutlinedInput-input": {
        color: isDark ? "#F1F5F9" : "#101828",
        "&::placeholder": {
          color: isDark ? "#94A3B8" : "#667085",
          opacity: 1,
        },
      },
    },
    button: {
      backgroundColor: isDark ? "#818CF8" : "#1570EF",
      color: "#FFFFFF",
      textTransform: "none",
      fontWeight: 600,
      "&:hover": {
        backgroundColor: isDark ? "#6366F1" : "#1570EF",
        opacity: 0.9,
      },
      "&:disabled": {
        backgroundColor: isDark ? "#818CF8" : "#1570EF",
        opacity: 0.5,
      },
    },
    formContainer: {
      backgroundColor: isDark ? "rgba(30, 41, 59, 0.5)" : "#FFFFFF",
      padding: "24px",
      borderRadius: "12px",
      border: `1px solid ${isDark ? "rgba(148, 163, 184, 0.2)" : "#D0D5DD"}`,
      boxShadow: isDark 
        ? "0px 1px 3px rgba(0, 0, 0, 0.2), 0px 1px 2px rgba(0, 0, 0, 0.12)"
        : "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
    },
  };
  
  

  return (
    <Container component="main" maxWidth="sm">
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
            fontWeight: 600,
            color: isDark ? '#F1F5F9' : '#101828',
          }}
        >
          New Application
        </Typography>

        <Paper
          elevation={0}
          sx={{
            width: '100%',
            p: 4,
            background: isDark ? 'rgba(30, 41, 59, 0.5)' : '#FFFFFF',
            border: `1px solid ${isDark ? 'rgba(148, 163, 184, 0.2)' : '#E5E7EB'}`,
            borderRadius: '12px',
          }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            autocomplete="off"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Business />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Work />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CurrencyRupee />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Application Date"
              name="applicationDate"
              type="date"
              value={formData.applicationDate}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="Applied">Applied</MenuItem>
                <MenuItem value="Interview">Interview</MenuItem>
                <MenuItem value="Offer">Offer</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Job Link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/applications')}
                sx={{
                  mr: 2,
                  borderWidth: '2px',
                  borderColor: isDark ? '#818CF8' : '#4F46E5',
                  color: isDark ? '#818CF8' : '#4F46E5',
                  '&:hover': {
                    backgroundColor: isDark
                      ? 'rgba(129, 140, 248, 0.1)'
                      : 'rgba(79, 70, 229, 0.1)',
                    borderColor: isDark ? '#6366F1' : '#4338CA',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: isDark ? '#818CF8' : '#4F46E5',
                  '&:hover': {
                    backgroundColor: isDark ? '#6366F1' : '#4338CA',
                  },
                }}
              >
                Create Application
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ApplicationForm;
