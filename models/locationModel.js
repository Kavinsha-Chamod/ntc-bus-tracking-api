"use strict";
const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    busId: { type: Number, required: true },
    latitude: { type: Number, required: true, min: -90, max: 90 },
    longitude: { type: Number, required: true, min: -180, max: 180 },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

locationSchema.index({ busId: 1 });
locationSchema.index({ timestamp: -1 }); 

module.exports = mongoose.model("Location", locationSchema);
