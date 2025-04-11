import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  useTheme,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Send,
  Person,
  Category,
  Message,
} from '@mui/icons-material';

const Contact = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    messageType: 'feedback',
    message: '',
  });

  const messageTypes = [
    { value: 'feedback', label: 'Feedback' },
    { value: 'question', label: 'Question' },
    { value: 'suggestion', label: 'Suggestion' },
    { value: 'other', label: 'Other' },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/feedback/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          messageType: 'feedback',
          message: '',
        });
        alert('Message sent successfully!');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const contactInfo = [
    {
      icon: <Email fontSize="large" />,
      title: 'Email',
      value: 'kuruvaradhakrishna77@gmail.com',
      link: 'mailto:kuruvaradhakrishna77@gmail.com',
    },
    {
      icon: <Phone fontSize="large" />,
      title: 'Phone',
      value: '+91 78158 51788',
      link: 'tel:+917815851788',
    },
    {
      icon: <LocationOn fontSize="large" />,
      title: 'Location',
      value: 'Hyderabad, India',
    },
  ];

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : '#F9FAFB',
      '& fieldset': {
        borderColor: isDark ? 'rgba(148, 163, 184, 0.2)' : '#E5E7EB',
      },
      '&:hover fieldset': {
        borderColor: isDark ? 'rgba(148, 163, 184, 0.3)' : '#D1D5DB',
      },
      '&.Mui-focused fieldset': {
        borderColor: isDark ? '#818CF8' : '#4F46E5',
      },
      '& input:-webkit-autofill, & textarea:-webkit-autofill': {
        '-webkit-box-shadow': isDark ? '0 0 0 100px rgb(30, 41, 59) inset !important' : '0 0 0 100px #F9FAFB inset !important',
        '-webkit-text-fill-color': isDark ? '#F1F5F9 !important' : '#111827 !important',
        'caret-color': isDark ? '#F1F5F9' : '#111827',
      },
      '& input:-webkit-autofill:hover, & textarea:-webkit-autofill:hover': {
        '-webkit-box-shadow': isDark ? '0 0 0 100px rgb(30, 41, 59) inset !important' : '0 0 0 100px #F9FAFB inset !important',
      },
      '& input:-webkit-autofill:focus, & textarea:-webkit-autofill:focus': {
        '-webkit-box-shadow': isDark ? '0 0 0 100px rgb(30, 41, 59) inset !important' : '0 0 0 100px #F9FAFB inset !important',
      },
    },
    '& .MuiInputLabel-root': {
      color: isDark ? '#94A3B8' : '#6B7280',
      '&.Mui-focused': {
        color: isDark ? '#818CF8' : '#4F46E5',
      },
    },
    '& .MuiInputBase-input, & .MuiInputBase-inputMultiline': {
      color: isDark ? '#F1F5F9' : 'inherit',
    },
    '& .MuiSvgIcon-root': {
      color: isDark ? '#94A3B8' : '#6B7280',
    },
  };

  return (
    <Box sx={{ minHeight: '100vh', pb: 6 }}>
      {/* Header Section */}
      <Box
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)'
            : 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
          py: 8,
          mb: 6,
          borderRadius: { xs: 0, sm: '0 0 24px 24px' },
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            sx={{
              color: '#FFFFFF',
              textAlign: 'center',
              fontSize: { xs: '2rem', sm: '3rem' },
              mb: 2,
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              fontWeight: 400,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            Get in touch with us for any questions or feedback
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Contact Information */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 400px' } }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                background: isDark
                  ? 'linear-gradient(145deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)'
                  : 'linear-gradient(145deg, rgba(79, 70, 229, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
              }}
            >
              <Typography variant="h4" gutterBottom>
                Contact Information
              </Typography>
              <Box sx={{ mt: 4 }}>
                {contactInfo.map((info, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: 4,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      '&:hover': {
                        '& .MuiSvgIcon-root': {
                          color: isDark ? '#818CF8' : '#4F46E5',
                          transform: 'scale(1.1)',
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: '12px',
                        background: isDark ? 'rgba(129, 140, 248, 0.1)' : 'rgba(79, 70, 229, 0.1)',
                      }}
                    >
                      {React.cloneElement(info.icon, {
                        sx: {
                          color: isDark ? '#818CF8' : '#4F46E5',
                          transition: 'all 0.2s',
                        },
                      })}
                    </Box>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {info.title}
                      </Typography>
                      {info.link ? (
                        <Typography
                          component="a"
                          href={info.link}
                          variant="body1"
                          sx={{
                            color: 'text.secondary',
                            textDecoration: 'none',
                            '&:hover': {
                              color: isDark ? '#818CF8' : '#4F46E5',
                            },
                          }}
                        >
                          {info.value}
                        </Typography>
                      ) : (
                        <Typography variant="body1" color="text.secondary">
                          {info.value}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>

          {/* Contact Form */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0%' } }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                background: isDark
                  ? 'linear-gradient(145deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)'
                  : 'linear-gradient(145deg, rgba(79, 70, 229, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
              }}
            >
              <Typography variant="h4" gutterBottom>
                Send a Message
              </Typography>
              <form onSubmit={handleSubmit} style={{ width: '100%' }} autocomplete="off">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    sx={inputStyles}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    sx={inputStyles}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Message Type"
                    name="messageType"
                    value={formData.messageType}
                    onChange={handleChange}
                    required
                    sx={inputStyles}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Category />
                        </InputAdornment>
                      ),
                    }}
                  >
                    {messageTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    sx={inputStyles}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Message />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<Send />}
                    sx={{
                      mt: 2,
                      px: 4,
                      py: 1.5,
                      borderRadius: '8px',
                      width: '100%',
                      backgroundColor: isDark ? '#818CF8' : '#4F46E5',
                      '&:hover': {
                        backgroundColor: isDark ? '#6366F1' : '#4338CA',
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </form>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact; 