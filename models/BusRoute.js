import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  route_id: { type: String, required: true, unique: true }, 
  route_name: { type: String, required: true },
  start_point: { type: String, required: true },
  end_point: { type: String, required: true },
  distance_km: { type: Number },
  est_duration_hrs: { type: Number },
  daily_trips_avg: { type: Number },
});

const BusRoute = mongoose.model("BusRoute", routeSchema, "busRoute"); 
export default BusRoute;