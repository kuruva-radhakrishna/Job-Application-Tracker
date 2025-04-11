const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./config/passport');
const { authenticateToken } = require('./middleware/auth');
const feedbackRoutes = require('./routes/feedback');
require('dotenv').config();
const cookieParser = require('cookie-parser');


const app = express();

// Determine if we are in production
const isProduction = process.env.NODE_ENV === 'production';

// Setup trusted proxy if behind one (useful for Render, Heroku, etc.)
if (isProduction) {
  app.set('trust proxy', 1);
}


const allowedOrigins = [
  'https://job-application-tracker-kuruva-radhakrishnas-projects.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));



// Session configuration with conditional cookie settings
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    secure: isProduction, // Only use secure cookies in production
    // Set sameSite based on environment: 'none' for production if using cross-site cookies, 'lax' otherwise.
    sameSite: isProduction ? 'none' : 'lax'
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Parse JSON bodies
app.use(express.json());
app.use(cookieParser());
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/applications');
const userRoutes = require('./routes/users');

app.use('/api/auth', authRoutes);
app.use('/api/applications', authenticateToken, applicationRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/feedback', feedbackRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
