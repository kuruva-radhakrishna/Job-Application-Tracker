const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { authenticateToken } = require('../middleware/auth');

// Get all applications for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const query = { user: req.user._id };
    
    // Add status filter if provided
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    const applications = await Application.find(query);
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Create a new application
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { company, role, status, applicationDate, link, location, salary } = req.body;
    
    const application = new Application({
      company,
      role,
      status,
      applicationDate,
      link,
      location,
      salary,
      user: req.user._id
    });

    const savedApplication = await application.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ message: error.message || 'Error creating application' });
  }
});

// Update application status
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, location, salary } = req.body;
    
    const updateFields = {};
    if (status) updateFields.status = status;
    if (location) updateFields.location = location;
    if (salary) updateFields.salary = salary;
    
    const updatedApplication = await Application.findOneAndUpdate(
      { _id: id, user: req.user._id },
      updateFields,
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found or unauthorized' });
    }

    res.json(updatedApplication);
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ message: 'Error updating application' });
  }
});

// Delete an application
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if the application belongs to the user
    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this application' });
    }

    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ message: 'Error deleting application' });
  }
});

module.exports = router; 