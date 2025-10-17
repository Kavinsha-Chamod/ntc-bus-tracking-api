'use strict';
const express = require('express');
const authController = require('../controllers/authController');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

router.post('/login', authController.login);

// Admin-only user registration for operator/commuter roles
router.post(
  '/register',
  authenticateToken,
  requireRole(['admin']),
  authController.register
);

module.exports = router;