import express from "express";
import { getBuses, getBusById, getBusesByRoute, updateBusLocation, getBusLocation } from "../controllers/busController.js";

const router = express.Router();

router.get("/", getBuses);
router.get("/:bus_id", getBusById);
router.get("/route/:routeId", getBusesByRoute);

router.get("/:bus_id/location", getBusLocation);
router.put("/:bus_id/location", updateBusLocation);

export default router;