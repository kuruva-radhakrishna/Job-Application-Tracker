const jwt = require('jsonwebtoken');

// Middleware to check if user is authenticated
const authenticateToken = (req, res, next) => {
  try {
    // Get the user from the session
    console.log(req.session);
    if (!req.session || !req.session.user) {
      return res.status(401).json({ message: 'Unauthorized - No session' });
    }

    // Set the user in the request object
    req.user = req.session.user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Unauthorized - Invalid session' });
  }
};

module.exports = {
  authenticateToken
}; 