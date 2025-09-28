import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  busId: { type: String, required: true, unique: true },
  vehicle_no: { type: String, required: true, unique: true },
  operator: { type: String, required: true },
  capacity: Number,
  model: String,
  assignedRoute: { type: String, ref: "Route" },
});

const Bus = mongoose.model("Bus", busSchema);
export default Bus;
