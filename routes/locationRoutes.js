'use strict';
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const locationController = require('../controllers/locationController');

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Get all location records
 *     description: Retrieve all GPS location records for buses
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of location records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *             example:
 *               - _id: "507f1f77bcf86cd799439011"
 *                 busId: 1001
 *                 latitude: 6.9271
 *                 longitude: 79.8612
 *                 timestamp: "2024-01-15T08:30:00Z"
 *                 createdAt: "2024-01-15T08:30:00Z"
 *                 updatedAt: "2024-01-15T08:30:00Z"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Access denied. No token provided."
 */
router.get('/', locationController.getAllLocations);

/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Create a new location record
 *     description: Record GPS location for a specific bus
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *           example:
 *             busId: 1001
 *             latitude: 6.9271
 *             longitude: 79.8612
 *             timestamp: "2024-01-15T08:30:00Z"
 *     responses:
 *       201:
 *         description: Location record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
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
 */
router.post('/', locationController.createLocation);

/**
 * @swagger
 * /api/locations/{id}:
 *   get:
 *     summary: Get location record by ID
 *     description: Retrieve a specific location record by its ID
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Location record ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Location record retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Access denied. No token provided."
 *       404:
 *         description: Location record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Location record not found"
 */
router.get('/:id', locationController.getLocationById); 

/**
 * @swagger
 * /api/locations/{id}:
 *   put:
 *     summary: Update location record by ID
 *     description: Update an existing location record
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Location record ID
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *           example:
 *             busId: 1001
 *             latitude: 6.9275
 *             longitude: 79.8615
 *             timestamp: "2024-01-15T08:35:00Z"
 *     responses:
 *       200:
 *         description: Location record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
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
 *       404:
 *         description: Location record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Location record not found"
 */
router.put('/:id', locationController.updateLocation);

/**
 * @swagger
 * /api/locations/{id}:
 *   delete:
 *     summary: Delete location record by ID
 *     description: Remove a location record from the system
 *     tags: [Locations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Location record ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Location record deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Location record deleted successfully"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Access denied. No token provided."
 *       404:
 *         description: Location record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Location record not found"
 */
router.delete('/:id', locationController.deleteLocation);

module.exports = router;