import express from "express";
import { getRoutes, getRouteById, getBusesByRoute } from "../controllers/busRouteController.js";

const router = express.Router();

router.get("/", getRoutes);
router.get("/:id", getRouteById);
router.get("/:id/buses", getBusesByRoute);

export default router;