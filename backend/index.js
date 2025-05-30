require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const logger = require('./utils/logger');
const cors = require("cors");
const session = require('express-session');
const passport = require('./config/passport');
const { isAuthenticated } = require('./middleware/auth');

const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const audienceRoutes = require('./routes/audienceRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const segmentRoutes = require('./routes/segmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Morgan log setup
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => logger.info('MongoDB Connected'))
.catch((err) => logger.error('MongoDB Error: ' + err));

// Public routes
app.use('/auth', authRoutes);

// Protected routes
app.use('/customers', isAuthenticated, customerRoutes);
app.use('/orders', isAuthenticated, orderRoutes);
app.use('/audience-count', isAuthenticated, audienceRoutes);
app.use('/campaigns', isAuthenticated, campaignRoutes);
app.use('/segments', isAuthenticated, segmentRoutes);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});