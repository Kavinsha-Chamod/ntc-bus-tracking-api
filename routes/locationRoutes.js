import express from "express";
import { addLocation, getLatestLocation } from "../controllers/locationController.js";

const router = express.Router();

router.post("/", addLocation);
router.get("/:busId", getLatestLocation);

export default router;
