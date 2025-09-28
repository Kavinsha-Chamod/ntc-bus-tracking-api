import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  bus_id: { type: String, ref: "Bus", required: true },
  timestamp: { type: Date, default: Date.now },
  coords: {
    type: [Number],
    required: true,
    index: "2dsphere",
  },
  speed: { type: Number },
  status: {
    type: String,
    enum: ["On-time", "Delayed", "Stopped"],
    default: "On-time",
  },
});

const Location = mongoose.model("Location", locationSchema);
export default Location;
