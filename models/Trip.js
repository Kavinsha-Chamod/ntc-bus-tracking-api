import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  trip_id: { type: String, required: true, unique: true },
  bus_id: { type: String },          
  route_id: { type: String },       
  departure_time: { type: String },   
  est_arrival: { type: String },
  fare_lkr: { type: Number },
  status: { type: String, enum: ["On-time", "Delayed", "Cancelled"], default: "On-time" },
  delay_mins: { type: Number, default: 0 },
  date: { type: Date },
});

const Trip = mongoose.model("Trip", tripSchema, "trip");
export default Trip;