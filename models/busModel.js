"use strict";
const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    busId: { type: Number, required: true, unique: true },
    routeId: { type: Number, required: true },
    operatorId: { type: Number, required: true },
    capacity: { type: Number, required: true, min: 1 },
    licensePlate: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

busSchema.index({ routeId: 1 });

module.exports = mongoose.model("Bus", busSchema);
