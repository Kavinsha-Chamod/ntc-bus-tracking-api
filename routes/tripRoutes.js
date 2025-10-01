"use strict";
const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const tripController = require("../controllers/tripController");

const router = express.Router();

router.use(authenticateToken);

router.get("/", tripController.getAllTrips);
router.post("/", tripController.createTrip);
router.get("/:id", tripController.getTripById);
router.put("/:id", tripController.updateTrip);
router.delete("/:id", tripController.deleteTrip);

module.exports = router;
