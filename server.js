import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import busRouteRoutes from "./routes/busRouteRoutes.js";
import busRoutes from "./routes/busRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use("/api/routes", busRouteRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/locations", locationRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
