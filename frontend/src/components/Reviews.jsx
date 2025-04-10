import React, { useEffect, useState } from 'react';
import {  Box,  Typography,  Paper,  Stack,  Avatar,  Chip,  CircularProgress,  useTheme,} from '@mui/material';
import { FormatQuote } from '@mui/icons-material';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://job-application-tracker-backend-z59w.onrender.com/api/feedback/public');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress sx={{ color: theme.palette.primary.main }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  if (reviews.length === 0) {
    return (
      <Typography align="center" color="textSecondary" sx={{ py: 4 }}>
        No reviews yet. Be the first to leave feedback!
      </Typography>
    );
  }

  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { 
        xs: '1fr', 
        md: 'repeat(2, 1fr)', 
        lg: 'repeat(3, 1fr)' 
      },
      gap: 4,
      px: { xs: 2, md: 0 }
    }}>
      {reviews.map((review) => (
        <Paper
          key={review._id}
          elevation={0}
          sx={{
            p: 4,
            background: theme.palette.mode === 'light' 
              ? 'linear-gradient(145deg, #ffffff, #f5f7ff)'
              : 'linear-gradient(145deg, #1F2937, #111827)',
            border: `1px solid ${theme.palette.mode === 'light' 
              ? 'rgba(79, 70, 229, 0.1)'
              : 'rgba(99, 102, 241, 0.1)'}`,
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: theme.palette.mode === 'light'
                ? '0 20px 40px -15px rgba(79, 70, 229, 0.15)'
                : '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
              border: `1px solid ${theme.palette.mode === 'light'
                ? 'rgba(79, 70, 229, 0.2)'
                : 'rgba(99, 102, 241, 0.2)'}`,
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '4px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            }
          }}
        >
          <FormatQuote 
            sx={{ 
              position: 'absolute',
              top: 20,
              right: 20,
              color: theme.palette.mode === 'light'
                ? 'rgba(79, 70, 229, 0.1)'
                : 'rgba(99, 102, 241, 0.1)',
              fontSize: 60,
              transform: 'rotate(180deg)'
            }} 
          />
          
          <Stack spacing={3}>
            <Box>
              <Chip 
                label={review.messageType.charAt(0).toUpperCase() + review.messageType.slice(1)}
                size="small"
                sx={{
                  backgroundColor: theme.palette.mode === 'light'
                    ? 'rgba(79, 70, 229, 0.1)'
                    : 'rgba(99, 102, 241, 0.1)',
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  mb: 2,
                  borderRadius: '8px',
                  '& .MuiChip-label': {
                    px: 2,
                  }
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.primary,
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                "{review.message}"
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              pt: 2,
              borderTop: `1px solid ${theme.palette.mode === 'light'
                ? 'rgba(79, 70, 229, 0.1)'
                : 'rgba(99, 102, 241, 0.1)'}`
            }}>
              <Avatar
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: 48,
                  height: 48,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  border: `2px solid ${theme.palette.background.paper}`,
                  boxShadow: `0 0 0 2px ${theme.palette.mode === 'light'
                    ? 'rgba(79, 70, 229, 0.2)'
                    : 'rgba(99, 102, 241, 0.2)'}`
                }}
              >
                {review.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    fontSize: '1.1rem'
                  }}
                >
                  {review.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    fontSize: '0.95rem'
                  }}
                >
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
};

export default Reviews; 