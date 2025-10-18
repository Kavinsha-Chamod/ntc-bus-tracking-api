'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
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
app.use(cors({ 
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: false
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

// Swagger Documentation
app.get('/api-docs/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpecs);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'NTC Bus Tracking API Documentation'
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/trips', tripRoutes);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Check if the API and database are running properly
 *     tags: [System]
 *     security: []
 *     responses:
 *       200:
 *         description: System is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 *             example:
 *               status: "OK"
 *               timestamp: "2024-01-15T08:00:00.000Z"
 *       500:
 *         description: System is unhealthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 *             example:
 *               status: "Error"
 */
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


