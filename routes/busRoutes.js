"use strict";
const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const busController = require("../controllers/busController");

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * /api/buses:
 *   get:
 *     summary: Get all buses
 *     description: Retrieve a list of all buses in the system
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of buses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bus'
 *             example:
 *               - _id: "507f1f77bcf86cd799439011"
 *                 busId: 1001
 *                 routeId: 201
 *                 operatorId: 301
 *                 capacity: 50
 *                 licensePlate: "ABC-1234"
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
router.get("/", busController.getAllBuses);

/**
 * @swagger
 * /api/buses:
 *   post:
 *     summary: Create a new bus
 *     description: Add a new bus to the system
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *           example:
 *             busId: 1002
 *             routeId: 202
 *             operatorId: 302
 *             capacity: 45
 *             licensePlate: "XYZ-5678"
 *     responses:
 *       201:
 *         description: Bus created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
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
 *         description: Bus ID or license plate already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Bus ID already exists"
 */
router.post("/", busController.createBus);

/**
 * @swagger
 * /api/buses/{id}:
 *   get:
 *     summary: Get bus by ID
 *     description: Retrieve a specific bus by its ID
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bus ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Bus retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Access denied. No token provided."
 *       404:
 *         description: Bus not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Bus not found"
 */
router.get("/:id", busController.getBusById);

/**
 * @swagger
 * /api/buses/{id}:
 *   put:
 *     summary: Update bus by ID
 *     description: Update an existing bus's information
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bus ID
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *           example:
 *             busId: 1001
 *             routeId: 201
 *             operatorId: 301
 *             capacity: 55
 *             licensePlate: "ABC-1234"
 *     responses:
 *       200:
 *         description: Bus updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
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
 *         description: Bus not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Bus not found"
 */
router.put("/:id", busController.updateBus);

/**
 * @swagger
 * /api/buses/{id}:
 *   delete:
 *     summary: Delete bus by ID
 *     description: Remove a bus from the system
 *     tags: [Buses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bus ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Bus deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bus deleted successfully"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Access denied. No token provided."
 *       404:
 *         description: Bus not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Bus not found"
 */
router.delete("/:id", busController.deleteBus);

module.exports = router;
