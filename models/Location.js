import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  busId: { type: String, ref: "Bus", required: true },
  timestamp: { type: Date, default: Date.now },
  coords: {
    type: [Number],
    required: true,
    index: "2dsphere",
  },
  speed: Number,
  status: {
    type: String,
    enum: ["on-time", "delayed", "stopped"],
    default: "on-time",
  },
});

const Location = mongoose.model("Location", locationSchema);
export default Location;
