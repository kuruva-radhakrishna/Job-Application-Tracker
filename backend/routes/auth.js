const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

    // Set user in session
    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email
    };

    // Save session explicitly
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ message: 'Error saving session' });
      }

      // console.log('Session after registration:', {
      //   sessionId: req.sessionID,
      //   user: req.session.user
      // });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email
      });
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Error in registration' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    // console.log('Login request body:', req.body);
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Set user in session
    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email
    };
    
    // Save session explicitly
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ message: 'Error saving session' });
      }

      // console.log('Session after login:', {
      //   sessionId: req.sessionID,
      //   user: req.session.user
      // });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error in login' });
  }
});

// Get current user
router.get('/current-user', async (req, res) => {
  try {
    // console.log('Current user session:', {
    //   sessionId: req.sessionID,
    //   session: req.session,
    //   user: req.session?.user
    // });

    if (!req.session || !req.session.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await User.findById(req.session.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Error getting current user' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  if (!req.session) {
    return res.json({ message: 'Already logged out' });
  }

  const sessionID = req.sessionID;
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Error logging out' });
    }
    // console.log('Session destroyed:', sessionID);
    res.clearCookie('connect.sid', {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router; 