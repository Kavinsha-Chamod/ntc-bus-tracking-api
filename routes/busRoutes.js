"use strict";
const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const busController = require("../controllers/busController");

const router = express.Router();

router.use(authenticateToken);

router.get("/", busController.getAllBuses);
router.post("/", busController.createBus);
router.get("/:id", busController.getBusById);
router.put("/:id", busController.updateBus);
router.delete("/:id", busController.deleteBus);

module.exports = router;
