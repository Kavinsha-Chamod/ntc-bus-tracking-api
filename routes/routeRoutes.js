'use strict';
const express = require('express');
const { authenticateToken, requireRole } = require('../middleware/auth');
const routeController = require('../controllers/routeController');

const router = express.Router();

router.use(authenticateToken, requireRole(['admin']));

router.get('/', routeController.getAllRoutes);
router.post('/', routeController.createRoute);
router.get('/:id', routeController.getRouteById);
router.put('/:id', routeController.updateRoute);
router.delete('/:id', routeController.deleteRoute);

module.exports = router;