import axios from 'axios';

const API_URL = 'https://job-application-tracker-backend-z59w.onrender.com/api/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getApplications = async (filters = {}) => {
  try {
    const response = await api.get('/applications', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};

export const createApplication = async (applicationData) => {
  try {
    const response = await api.post('/applications', applicationData);
    return response.data;
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
};

export const updateApplicationStatus = async (id, status) => {
  try {
    const response = await api.put(`/applications/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};

export const deleteApplication = async (id) => {
  try {
    const response = await api.delete(`/applications/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
};

export default api; 