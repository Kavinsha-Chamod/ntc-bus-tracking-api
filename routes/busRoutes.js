import express from "express";
import { getBuses, getBusById, getBusesByRoute } from "../controllers/busController.js";

const router = express.Router();

router.get("/", getBuses);
router.get("/:bus_id", getBusById);
router.get("/route/:routeId", getBusesByRoute);

export default router;