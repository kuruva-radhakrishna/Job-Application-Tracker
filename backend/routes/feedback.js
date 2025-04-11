const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');


// Submit feedback
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback({
      ...req.body,
      isPublic: req.body.messageType === 'feedback' // Set public if it's feedback type
    });
    await feedback.save();
    res.status(201).json({ message: 'Thank you for your feedback!' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// Get all public feedback
router.get('/public', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ isPublic: true })
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(9) // Limit to 9 most recent feedbacks
      .select('-email'); // Exclude email field from response
    
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

module.exports = router;