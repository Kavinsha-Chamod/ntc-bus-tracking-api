import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  routeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  stops: [String],
  distance_km: Number,
});

const Route = mongoose.model("Route", routeSchema);
export default Route;
