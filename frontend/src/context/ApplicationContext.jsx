// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { 
//   getApplications, 
//   createApplication, 
//   updateApplicationStatus, 
//   deleteApplication 
// } from '../services/api';

// const ApplicationContext = createContext();

// export const ApplicationProvider = ({ children }) => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({
//     status: '',
//     startDate: '',
//     endDate: ''
//   });

//   // Fetch applications with filters
//   const fetchApplications = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await getApplications(filters);
//       setApplications(data);
//     } catch (err) {
//       setError('Failed to fetch applications');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add new application
//   const addApplication = async (applicationData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const newApplication = await createApplication(applicationData);
//       setApplications(prev => [...prev, newApplication]);
//       return newApplication;
//     } catch (err) {
//       setError('Failed to add application');
//       console.error(err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update application status
//   const updateStatus = async (id, status) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const updatedApplication = await updateApplicationStatus(id, status);
//       setApplications(prev => 
//         prev.map(app => app._id === id ? updatedApplication : app)
//       );
//       return updatedApplication;
//     } catch (err) {
//       setError('Failed to update application status');
//       console.error(err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete application
//   const removeApplication = async (id) => {
//     setLoading(true);
//     setError(null);
//     try {
//       await deleteApplication(id);
//       setApplications(prev => prev.filter(app => app._id !== id));
//     } catch (err) {
//       setError('Failed to delete application');
//       console.error(err);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update filters
//   const updateFilters = (newFilters) => {
//     setFilters(prev => ({ ...prev, ...newFilters }));
//   };

//   // Fetch applications when filters change
//   useEffect(() => {
//     fetchApplications();
//   }, [filters]);

//   const value = {
//     applications,
//     loading,
//     error,
//     filters,
//     addApplication,
//     updateStatus,
//     removeApplication,
//     updateFilters,
//     fetchApplications
//   };

//   return (
//     <ApplicationContext.Provider value={value}>
//       {children}
//     </ApplicationContext.Provider>
//   );
// };

// export const useApplications = () => {
//   const context = useContext(ApplicationContext);
//   if (!context) {
//     throw new Error('useApplications must be used within an ApplicationProvider');
//   }
//   return context;
// };

// export default ApplicationContext; 