'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Middleware (security, logging, parsing - open-standards)
app.use(helmet()); 
app.use(cors({ origin: '*' })); 
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

// Health check (with DB ping)
app.get('/health', async (req, res) => {
  try {
    await require('mongoose').connection.db.admin().ping();
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ status: 'Error' });
  }
});

// 404 & Error handlers (robust)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} - Fully REST-compliant API`);
});