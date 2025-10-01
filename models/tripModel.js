"use strict";
const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    tripId: { type: Number, required: true, unique: true },
    busId: { type: Number, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["scheduled", "in_transit", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

tripSchema.index({ busId: 1, departureTime: 1 });
tripSchema.index({ status: 1 });

module.exports = mongoose.model("Trip", tripSchema);
