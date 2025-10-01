'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

// Routers
const authRoutes = require('./routes/authRoutes');
const busRoutes = require('./routes/busRoutes');
const locationRoutes = require('./routes/locationRoutes');
const routeRoutes = require('./routes/routeRoutes');
const tripRoutes = require('./routes/tripRoutes');

const app = express();

// Connect DB once per runtime (safe for serverless cold start)
connectDB();

// Middleware
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/trips', tripRoutes);

// Health
app.get('/health', async (req, res) => {
  try {
    await require('mongoose').connection.db.admin().ping();
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ status: 'Error' });
  }
});

// 404 & Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;


