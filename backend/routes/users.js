const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { authenticateToken } = require('../middleware/auth');

// File size limit: 5MB
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;

// Allowed file types
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
const ALLOWED_RESUME_TYPES = ['application/pdf'];

// Helper function to get public user data
const getUserData = (user) => ({
  id: user._id,
  email: user.email,
  name: user.name,
  bio: user.bio,
  profilePic: user.profilePic,
  resume: user.resume,
  registeredAt: user.registeredAt,
  lastUpdated: user.lastUpdated
});

// Configure multer for images
const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: FILE_SIZE_LIMIT
  },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'), false);
    }
    cb(null, true);
  }
});

// Configure multer for resume
const uploadResume = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: FILE_SIZE_LIMIT
  },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_RESUME_TYPES.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only PDF files are allowed.'), false);
    }
    cb(null, true);
  }
});

// Verify Cloudinary configuration
const verifyCloudinaryConfig = () => {
  const { cloud_name, api_key, api_secret } = cloudinary.config();
  if (!cloud_name || !api_key || !api_secret) {
    throw new Error('Missing Cloudinary configuration');
  }
};

// Configure Cloudinary
try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  verifyCloudinaryConfig();
  console.log('Cloudinary configured successfully');
} catch (error) {
  console.error('Cloudinary configuration error:', error);
}

// Get current user's profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(getUserData(user));
    // console.log(res);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, bio } = req.body;
    const userId = req.session.user._id;

    // Only update fields that are provided
    const updateFields = {};
    if (name) updateFields.name = name;
    if (bio !== undefined) updateFields.bio = bio;
    updateFields.lastUpdated = new Date();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update session user data
    req.session.user = updatedUser;
    
    // Return the public user data
    res.json(getUserData(updatedUser));
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile', detail: error.message });
  }
});

// Delete profile picture
router.delete('/profile/picture', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.session.user._id,
      { 
        $set: { 
          profilePic: '',
          lastUpdated: new Date()
        }
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(getUserData(user));
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    res.status(500).json({ message: 'Error deleting profile picture' });
  }
});

// Upload image route
router.post('/upload-image', authenticateToken, uploadImage.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Log file details for debugging
    // console.log('Uploading file:', {
    //   mimetype: req.file.mimetype,
    //   size: req.file.size,
    //   originalName: req.file.originalname
    // });

    // Convert buffer to base64
    const fileStr = req.file.buffer.toString('base64');
    const fileType = req.file.mimetype;

    // Upload to Cloudinary with transformation
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${fileType};base64,${fileStr}`,
      {
        folder: 'profile_pictures',
        resource_type: 'auto',
        transformation: [
          { width: 500, height: 500, crop: 'fill' },
          { quality: 'auto:good' }
        ]
      }
    ).catch(error => {
      console.error('Cloudinary upload error:', {
        error: error.message,
        errorDetails: error.http_code ? {
          http_code: error.http_code,
          public_id: error.public_id,
          secure_url: error.secure_url
        } : null
      });
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    });

    // console.log('Cloudinary upload successful:', {
    //   public_id: uploadResponse.public_id,
    //   secure_url: uploadResponse.secure_url
    // });

    res.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error('Error in upload route:', error);
    
    if (error.message.includes('Invalid file type')) {
      return res.status(400).json({ message: error.message });
    }
    
    if (error.message.includes('File too large')) {
      return res.status(400).json({ 
        message: `File size exceeds limit of ${FILE_SIZE_LIMIT / (1024 * 1024)}MB` 
      });
    }

    if (error.message.includes('Cloudinary upload failed')) {
      return res.status(500).json({ 
        message: 'Failed to upload image to cloud storage',
        detail: error.message
      });
    }

    res.status(500).json({ 
      message: 'Error uploading image',
      detail: error.message
    });
  }
});

// Upload resume route
router.post('/upload-resume', authenticateToken, uploadResume.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Log file details for debugging
    // console.log('Uploading resume:', {
    //   mimetype: req.file.mimetype,
    //   size: req.file.size,
    //   originalName: req.file.originalname
    // });

    // Convert buffer to base64
    const fileStr = req.file.buffer.toString('base64');
    const fileType = req.file.mimetype;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${fileType};base64,${fileStr}`,
      {
        folder: 'resumes',
        resource_type: 'raw',
        format: 'pdf'
      }
    ).catch(error => {
      console.error('Cloudinary resume upload error:', error);
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    });

    // Update user with new resume URL
    const user = await User.findByIdAndUpdate(
      req.session.user._id,
      { 
        $set: { 
          resume: uploadResponse.secure_url,
          lastUpdated: new Date()
        }
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update session with new user data
    req.session.user = getUserData(user);
    await req.session.save();

    res.json(getUserData(user));
  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({ message: 'Error uploading resume' });
  }
});

// Delete resume route
router.delete('/resume', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.session.user._id,
      { 
        $set: { 
          resume: '',
          lastUpdated: new Date()
        }
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update session with new user data
    req.session.user = getUserData(user);
    await req.session.save();

    res.json(getUserData(user));
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ message: 'Error deleting resume' });
  }
});

// Get current user
router.get('/current-user', authenticateToken, async (req, res) => {
  try {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    res.json(req.session.user);
  } catch (error) {
    console.error('Error getting current user:', error);
    res.status(500).json({ message: 'Error getting current user' });
  }
});

// Change password
router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.session.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Error changing password' });
  }
});

module.exports = router; 