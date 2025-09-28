import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  tripId: { type: String, required: true, unique: true },
  busId: { type: String, ref: "Bus", required: true },
  routeId: { type: String, ref: "Route", required: true },
  departure: { type: Date, required: true },
  estimatedDurationHours: Number,
  status: {
    type: String,
    enum: ["scheduled", "ongoing", "completed", "cancelled"],
    default: "scheduled",
  },
});

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;
