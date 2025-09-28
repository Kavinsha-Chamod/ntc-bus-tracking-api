import express from "express";
import { getTrips, getTripById, updateTripStatus } from "../controllers/tripController.js";

const router = express.Router();

router.get("/", getTrips);
router.get("/:id", getTripById);
router.patch("/:id/status", updateTripStatus);

export default router;
