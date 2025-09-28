import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  trip_id: { type: String, required: true, unique: true },     
  bus_id: { type: String, ref: "Bus", required: true },
  route_id: { type: String, ref: "Route", required: true },
  departure_time: { type: String, required: true },            
  est_arrival: { type: String },                               
  fare_lkr: { type: Number },
  status: {
    type: String,
    enum: ["On-time", "Delayed", "Cancelled"],
    default: "On-time",
  },
  date: { type: Date, required: true },                        
});

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;
