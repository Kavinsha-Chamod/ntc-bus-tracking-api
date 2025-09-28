import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  bus_id: { type: String, required: true, unique: true },       
  type: { type: String, required: true },                      
  capacity: { type: Number, required: true },
  primary_route: { type: String, ref: "Route" },              
  weekly_trips: { type: Number, default: 0 },   
  location: {
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now }
  }                
});

const Bus = mongoose.model("Bus", busSchema);
export default Bus;