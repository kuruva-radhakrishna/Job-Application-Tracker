const jwt = require('jsonwebtoken');

// Middleware to check if user is authenticated
const authenticateToken = (req, res, next) => {
  try {
    // console.log('Auth.js: Request headers:', req.headers);
    // console.log('Auth.js: Request cookies:', req.cookies);
    // console.log('Auth.js: Request session:', req.session);
    // Get the user from the session
    // console.log('Auth.js: Session in auth middleware:', {
    //   sessionId: req.sessionID,
    //   session: req.session,
    //   cookies: req.cookies,
    //   user: req.session?.user
    // });

    if (!req.session) {
      console.log('No session found');
      return res.status(401).json({ message: 'Unauthorized - No session' });
    }

    if (!req.session.user) {
      console.log('No user in session');
      return res.status(401).json({ message: 'Unauthorized - No user in session' });
    }

    // Set the user in the request object
    req.user = req.session.user;
    console.log('User authenticated:', req.user._id);
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Unauthorized - Invalid session' });
  }
};

module.exports = {
  authenticateToken
}; 