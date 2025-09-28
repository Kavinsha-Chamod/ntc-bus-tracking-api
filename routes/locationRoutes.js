import express from "express";
import { addLocation, getLatestLocation, getAllLatestLocations } from "../controllers/locationController.js";

const router = express.Router();

router.post("/", addLocation);
router.get("/:busId", getLatestLocation);
router.get("/", getAllLatestLocations);

export default router;
