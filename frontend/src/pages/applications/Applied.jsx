import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

const API_BASE_URL = "https://job-application-tracker-backend-z59w.onrender.com/api";

const Applied = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editLocation, setEditLocation] = useState('');
  const [editSalary, setEditSalary] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications?status=Applied`, {
        withCredentials: true
      });
      setApplications(response.data);
    } catch (err) {
      setError('Failed to fetch applications. Please try again later.');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleEditClick = (application) => {
    setEditingId(application._id);
    setEditLocation(application.location || '');
    setEditSalary(application.salary || '');
    setOpenDialog(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_BASE_URL}/applications/${editingId}`, 
        { 
          location: editLocation,
          salary: editSalary
        },
        { withCredentials: true }
      );
      
      setApplications(prev => 
        prev.map(app => app._id === editingId ? 
          { ...app, location: editLocation, salary: editSalary } : app
        )
      );
      setOpenDialog(false);
      setEditingId(null);
    } catch (error) {
      console.error('Error updating application:', error);
      setError('Failed to update application');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/applications/${id}`, {
        withCredentials: true
      });
      setApplications(applications.filter(app => app._id !== id));
    } catch (err) {
      console.error('Error deleting application:', err);
      setError('Failed to delete application');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#101828', fontWeight: 600 }}>
        Applied Applications
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #EAECF0' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? '#E2E8F0' : '#344054' }}>Company</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? '#E2E8F0' : '#344054' }}>Position</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? '#E2E8F0' : '#344054' }}>Application Date</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? '#E2E8F0' : '#344054' }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? '#E2E8F0' : '#344054' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? '#E2E8F0' : '#344054' }}>Salary</TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.mode === 'dark' ? '#E2E8F0' : '#344054' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4, color: theme.palette.mode === 'dark' ? '#CBD5E1' : '#475467' }}>
                  No applications found
                </TableCell>
              </TableRow>
            ) : (
              applications.map((application) => (
                <TableRow key={application._id} hover>
                  <TableCell sx={{ color: theme.palette.mode === 'dark' ? '#F1F5F9' : 'inherit' }}>{application.company}</TableCell>
                  <TableCell sx={{ color: theme.palette.mode === 'dark' ? '#F1F5F9' : 'inherit' }}>{application.role}</TableCell>
                  <TableCell sx={{ color: theme.palette.mode === 'dark' ? '#F1F5F9' : 'inherit' }}>
                    {new Date(application.applicationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.mode === 'dark' ? '#F1F5F9' : 'inherit' }}>{application.location || '-'}</TableCell>
                  <TableCell>
                    <Chip 
                      label="Applied"
                      sx={{ 
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(23, 92, 211, 0.2)' : '#EFF8FF',
                        color: theme.palette.mode === 'dark' ? '#60A5FA' : '#175CD3',
                        fontWeight: 500,
                        fontSize: '12px'
                      }} 
                    />
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.mode === 'dark' ? '#F1F5F9' : 'inherit' }}>{application.salary || '-'}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton 
                        size="small"
                        onClick={() => handleEditClick(application)}
                        sx={{ 
                          color: theme.palette.mode === 'dark' ? '#60A5FA' : '#1570EF',
                          '&:hover': { 
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(96, 165, 250, 0.12)' : 'rgba(21, 112, 239, 0.04)'
                          }
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleDelete(application._id)}
                        sx={{ 
                          color: theme.palette.mode === 'dark' ? '#F87171' : '#EF4444',
                          '&:hover': { 
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(248, 113, 113, 0.12)' : 'rgba(239, 68, 68, 0.04)'
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Update Application Details</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Location"
              value={editLocation}
              onChange={(e) => setEditLocation(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              placeholder="e.g. New York, NY"
            />
            
            <TextField
              label="Salary"
              value={editSalary}
              onChange={(e) => setEditSalary(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              placeholder="e.g. $100,000/year"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Applied; 