import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Avatar,
  Stack,
  Link,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  WorkHistory,
  QueryStats,
  BarChart,
  FolderSpecial,
  Email,
  Phone,
  LinkedIn,
  GitHub,
  Check,
  Timeline,
  Notifications,
  Security,
  CloudUpload,
  Search,
} from '@mui/icons-material';
import profileImage from '../assets/radha.jpg';
import Reviews from '../components/Reviews';

const About = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const features = [
    {
      icon: <WorkHistory sx={{ fontSize: 40, color: isDark ? '#818CF8' : '#4F46E5' }} />,
      title: 'Application Tracking',
      description: 'Keep track of your job applications in one centralized location.',
      benefits: [
        'Add and manage job applications',
        'Update application status',
        'Store company and role details',
        'View application history',
      ],
    },
    {
      icon: <Timeline sx={{ fontSize: 40, color: isDark ? '#818CF8' : '#4F46E5' }} />,
      title: 'Status Management',
      description: 'Organize applications by their current status in your job search process.',
      benefits: [
        'Track applications by status',
        'Move applications between stages',
        'View applications by category',
        'Filter by application status',
      ],
    },
    {
      icon: <BarChart sx={{ fontSize: 40, color: isDark ? '#818CF8' : '#4F46E5' }} />,
      title: 'Basic Analytics',
      description: 'View simple statistics about your job applications.',
      benefits: [
        'Total applications count',
        'Applications by status',
        'Basic success metrics',
        'Application timeline view',
      ],
    },
    {
      icon: <CloudUpload sx={{ fontSize: 40, color: isDark ? '#818CF8' : '#4F46E5' }} />,
      title: 'Application Details',
      description: 'Store and manage detailed information for each job application.',
      benefits: [
        'Save job descriptions',
        'Record salary information',
        'Store company locations',
        'Save application URLs',
      ],
    },
  ];

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
            About Us
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
            Empowering Your Job Search Journey
          </Typography>
        </Container>
      </Box>

      {/* Profile Section */}
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 6,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            gap: 4,
            background: isDark
              ? 'linear-gradient(145deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)'
              : 'linear-gradient(145deg, rgba(79, 70, 229, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: -2,
                left: -2,
                right: -2,
                bottom: -2,
                background: isDark
                  ? 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)'
                  : 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
                borderRadius: '50%',
                zIndex: 0,
              },
            }}
          >
            <Avatar
              src={profileImage}
              alt="Kuruva Radhakrishna"
              sx={{
                width: 180,
                height: 180,
                border: '4px solid',
                borderColor: isDark ? '#1F2937' : '#FFFFFF',
                position: 'relative',
                zIndex: 1,
              }}
            />
          </Box>
          <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h3" gutterBottom>
              Kuruva Radhakrishna
            </Typography>
            <Typography variant="h5" gutterBottom sx={{
              color: '#4F46E5',
              mb: 3,
              fontWeight: 600
            }}>
              Full Stack Developer & Student
            </Typography>
            <Typography variant="body1" paragraph>
              A passionate developer focused on creating efficient and user-friendly applications.
              This job application tracker is designed to help students and job seekers manage their
              job search process effectively, making the journey towards their dream career more organized and successful.
            </Typography>
            <Stack
              spacing={3}
              sx={{
                p: 3,
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Email sx={{ color: '#4F46E5' }} />
                <Typography variant="body1" color="#111827" fontWeight={500}>
                  kuruvaradhakrishna77@gmail.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Phone sx={{ color: '#4F46E5' }} />
                <Typography variant="body1" color="#111827" fontWeight={500}>
                  +91 78158 51788
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LinkedIn sx={{ color: '#4F46E5' }} />
                <Link
                  href="https://www.linkedin.com/in/kuruva-radhakrishna-457167260"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: '#111827',
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': { color: '#4F46E5' }
                  }}
                >
                  LinkedIn Profile
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <GitHub sx={{ color: '#4F46E5' }} />
                <Link
                  href="https://github.com/kuruva-radhakrishna"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: '#111827',
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': { color: '#4F46E5' }
                  }}
                >
                  GitHub Profile
                </Link>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="#6B7280" gutterBottom>Location</Typography>
                <Typography variant="body1" color="#111827" fontWeight={500}>
                  Hyderabad, India
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Paper>

        {/* Features Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              mb: 6, 
              textAlign: 'center',
              color: isDark ? '#F1F5F9' : '#111827',
            }}
          >
            Key Features
          </Typography>
          <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4 } }}>
            <Grid 
              container 
              spacing={4}
              columns={{ xs: 1, sm: 1, md: 2 }}
              sx={{ 
                width: '100%',
                margin: '0 auto',
              }}
            >
              {features.map((feature, index) => (
                <Grid 
                  item 
                  xs={1}
                  key={index}
                  sx={{
                    display: 'flex',
                    width: '100%',
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 3, md: 4 },
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: isDark
                        ? 'linear-gradient(145deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)'
                        : 'linear-gradient(145deg, rgba(79, 70, 229, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)',
                      border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                      borderRadius: '16px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: isDark 
                          ? '0 4px 20px rgba(129, 140, 248, 0.2)'
                          : '0 4px 20px rgba(79, 70, 229, 0.1)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: '12px',
                          background: isDark ? 'rgba(129, 140, 248, 0.1)' : 'rgba(79, 70, 229, 0.1)',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 600,
                          color: isDark ? '#F1F5F9' : '#111827',
                        }}
                      >
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body1" 
                      paragraph
                      sx={{
                        color: isDark ? '#E2E8F0' : '#4B5563',
                        mb: 3,
                      }}
                    >
                      {feature.description}
                    </Typography>
                    <List sx={{ mt: 'auto', py: 0 }}>
                      {feature.benefits.map((benefit, idx) => (
                        <ListItem 
                          key={idx} 
                          sx={{ 
                            px: 0, 
                            py: 0.75,
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Check sx={{ 
                              color: isDark ? '#818CF8' : '#4F46E5', 
                              fontSize: 20 
                            }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={benefit}
                            primaryTypographyProps={{
                              variant: 'body2',
                              sx: { 
                                color: isDark ? '#CBD5E1' : '#4B5563',
                                fontSize: '0.95rem',
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Container>

      {/* Reviews Section */}
      <Box sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h3" gutterBottom sx={{
          textAlign: 'center',
          color: '#111827',
          fontWeight: 700,
          mb: 6
        }}>
          What Our Users Say
        </Typography>
        <Reviews />
      </Box>
    </Box>
  );
};

export default About;
