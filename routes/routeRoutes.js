'use strict';
const express = require('express');
const { authenticateToken, requireRole } = require('../middleware/auth');
const routeController = require('../controllers/routeController');

const router = express.Router();

router.use(authenticateToken, requireRole(['admin']));

/**
 * @swagger
 * /api/routes:
 *   get:
 *     summary: Get all routes (Admin only)
 *     description: Retrieve all bus routes in the system. Only admin users can access this endpoint.
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of routes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Route'
 *             example:
 *               - _id: "507f1f77bcf86cd799439011"
 *                 routeId: 201
 *                 from: "Central Station"
 *                 to: "Airport Terminal"
 *                 distance: 15.5
 *                 estimatedTime: "45 minutes"
 *                 frequency: "Every 15 minutes"
 *                 createdAt: "2024-01-15T08:00:00Z"
 *                 updatedAt: "2024-01-15T08:00:00Z"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Access denied. No token provided."
 *       403:
 *         description: Forbidden - Admin role required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Access denied. Admin role required."
 */
router.get('/', routeController.getAllRoutes);

/**
 * @swagger
 * /api/routes:
 *   post:
 *     summary: Create a new route (Admin only)
 *     description: Add a new bus route to the system. Only admin users can perform this action.
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *           example:
 *             routeId: 202
 *             from: "City Center"
 *             to: "University Campus"
 *             distance: 8.2
 *             estimatedTime: "25 minutes"
 *             frequency: "Every 10 minutes"
 *     responses:
 *       201:
 *         description: Route created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Validation failed"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Access denied. No token provided."
 *       403:
 *         description: Forbidden - Admin role required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Access denied. Admin role required."
 *       409:
 *         description: Route ID already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Route ID already exists"
 */
router.post('/', routeController.createRoute);

/**
 * @swagger
 * /api/routes/{id}:
 *   get:
 *     summary: Get route by ID (Admin only)
 *     description: Retrieve a specific route by its ID. Only admin users can access this endpoint.
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Route ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Route retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Access denied. No token provided."
 *       403:
 *         description: Forbidden - Admin role required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Access denied. Admin role required."
 *       404:
 *         description: Route not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Route not found"
 */
router.get('/:id', routeController.getRouteById);

/**
 * @swagger
 * /api/routes/{id}:
 *   put:
 *     summary: Update route by ID (Admin only)
 *     description: Update an existing route's information. Only admin users can perform this action.
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Route ID
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *           example:
 *             routeId: 201
 *             from: "Central Station"
 *             to: "Airport Terminal"
 *             distance: 16.0
 *             estimatedTime: "50 minutes"
 *             frequency: "Every 12 minutes"
 *     responses:
 *       200:
 *         description: Route updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Validation failed"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Access denied. No token provided."
 *       403:
 *         description: Forbidden - Admin role required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Access denied. Admin role required."
 *       404:
 *         description: Route not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Route not found"
 */
router.put('/:id', routeController.updateRoute);

/**
 * @swagger
 * /api/routes/{id}:
 *   delete:
 *     summary: Delete route by ID (Admin only)
 *     description: Remove a route from the system. Only admin users can perform this action.
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Route ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Route deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Route deleted successfully"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Access denied. No token provided."
 *       403:
 *         description: Forbidden - Admin role required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Access denied. Admin role required."
 *       404:
 *         description: Route not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Route not found"
 */
router.delete('/:id', routeController.deleteRoute);

module.exports = router;