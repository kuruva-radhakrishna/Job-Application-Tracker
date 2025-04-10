const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./config/passport');
const { authenticateToken } = require('./middleware/auth');
const feedbackRoutes = require('./routes/feedback');
require('dotenv').config();


const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://your-frontend.onrender.com' // Optional: for production
];

app.use(cors({
  origin: true,  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  
  allowedHeaders: ['Content-Type', 'Authorization','cookie']
}));


// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24*7, // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));



// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

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