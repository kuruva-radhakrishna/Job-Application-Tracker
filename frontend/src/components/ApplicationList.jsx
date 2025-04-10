import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Container,
  Chip,
  Link as MuiLink,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  Edit as EditIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import axios from 'axios';
import { format } from 'date-fns';
import { useUser } from '../context/UserContext';

const statusColors = {
  Applied: 'primary',
  Interview: 'warning',
  Offer: 'success',
  Rejected: 'error'
};

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editSalary, setEditSalary] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const { userId } = useUser();

  useEffect(() => {
    const fetchApplications = async () => {
      if (!userId) {
        setError('No user authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/applications', {
          withCredentials: true
        });
        setApplications(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError(err.response?.data?.message || 'Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userId]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/api/applications/${id}`, 
        { status: newStatus },
        { withCredentials: true }
      );
      setApplications(prev => 
        prev.map(app => app._id === id ? { ...app, status: newStatus } : app)
      );
      setEditingId(null);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/applications/${id}`, {
        withCredentials: true
      });
      setApplications(applications.filter(app => app._id !== id));
    } catch (err) {
      console.error('Error deleting application:', err);
      setError(err.response?.data?.message || 'Failed to delete application');
    }
  };

  const handleEditClick = (application) => {
    setEditingId(application._id);
    setEditStatus(application.status);
    setEditLocation(application.location || '');
    setEditSalary(application.salary || '');
    setOpenDialog(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/applications/${editingId}`, 
        { 
          status: editStatus,
          location: editLocation,
          salary: editSalary
        },
        { withCredentials: true }
      );
      setApplications(prev => 
        prev.map(app => app._id === editingId ? 
          { ...app, status: editStatus, location: editLocation, salary: editSalary } : app
        )
      );
      setOpenDialog(false);
      setEditingId(null);
    } catch (error) {
      console.error('Error updating application:', error);
      setError(error.response?.data?.message || 'Failed to update application');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography>Loading applications...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#101828' }}>
        Your Applications
      </Typography>
      
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #E5E7EB' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#F9FAFB' }}>
              <TableCell>Company</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Application Date</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography sx={{ py: 2, color: '#6B7280' }}>
                    No applications found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              applications.map((application) => (
                <TableRow key={application._id}>
                  <TableCell>{application.company}</TableCell>
                  <TableCell>{application.role}</TableCell>
                  <TableCell>
                    <Chip 
                      label={application.status} 
                      color={statusColors[application.status]} 
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(application.applicationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {application.link ? (
                      <MuiLink 
                        href={application.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        sx={{ color: '#2563EB' }}
                      >
                        View
                      </MuiLink>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton 
                        size="small"
                        onClick={() => handleEditClick(application)}
                        sx={{ 
                          color: '#1570EF',
                          '&:hover': { 
                            backgroundColor: 'rgba(21, 112, 239, 0.04)'
                          }
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleDelete(application._id)}
                        sx={{ 
                          color: '#EF4444',
                          '&:hover': { 
                            backgroundColor: 'rgba(239, 68, 68, 0.04)'
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
            <FormControl fullWidth>
              <TextField
                select
                label="Status"
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                sx={{ mb: 2 }}
              >
                <MenuItem value="Applied">Applied</MenuItem>
                <MenuItem value="Interview">Interview</MenuItem>
                <MenuItem value="Offer">Offer</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </TextField>
            </FormControl>
            
            <TextField
              label="Location"
              value={editLocation}
              onChange={(e) => setEditLocation(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
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

export default ApplicationList; 