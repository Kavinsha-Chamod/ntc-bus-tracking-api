"use strict";
const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const tripController = require("../controllers/tripController");

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * /api/trips:
 *   get:
 *     summary: Get all trips
 *     description: Retrieve all bus trips in the system
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of trips retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 *             example:
 *               - _id: "507f1f77bcf86cd799439011"
 *                 tripId: 5001
 *                 busId: 1001
 *                 departureTime: "2024-01-15T08:00:00Z"
 *                 arrivalTime: "2024-01-15T08:45:00Z"
 *                 status: "scheduled"
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
 */
router.get("/", tripController.getAllTrips);

/**
 * @swagger
 * /api/trips:
 *   post:
 *     summary: Create a new trip
 *     description: Schedule a new bus trip
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *           example:
 *             tripId: 5002
 *             busId: 1002
 *             departureTime: "2024-01-15T09:00:00Z"
 *             arrivalTime: "2024-01-15T09:30:00Z"
 *             status: "scheduled"
 *     responses:
 *       201:
 *         description: Trip created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
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
 *       409:
 *         description: Trip ID already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Trip ID already exists"
 */
router.post("/", tripController.createTrip);

/**
 * @swagger
 * /api/trips/{id}:
 *   get:
 *     summary: Get trip by ID
 *     description: Retrieve a specific trip by its ID
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trip ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Trip retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Access denied. No token provided."
 *       404:
 *         description: Trip not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Trip not found"
 */
router.get("/:id", tripController.getTripById);

/**
 * @swagger
 * /api/trips/{id}:
 *   put:
 *     summary: Update trip by ID
 *     description: Update an existing trip's information
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trip ID
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *           example:
 *             tripId: 5001
 *             busId: 1001
 *             departureTime: "2024-01-15T08:00:00Z"
 *             arrivalTime: "2024-01-15T08:45:00Z"
 *             status: "in_transit"
 *     responses:
 *       200:
 *         description: Trip updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
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
 *         description: Trip not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Trip not found"
 */
router.put("/:id", tripController.updateTrip);

/**
 * @swagger
 * /api/trips/{id}:
 *   delete:
 *     summary: Delete trip by ID
 *     description: Remove a trip from the system
 *     tags: [Trips]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trip ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Trip deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Trip deleted successfully"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Access denied. No token provided."
 *       404:
 *         description: Trip not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Trip not found"
 */
router.delete("/:id", tripController.deleteTrip);

module.exports = router;
