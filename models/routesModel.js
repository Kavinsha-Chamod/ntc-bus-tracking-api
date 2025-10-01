"use strict";
const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    routeId: { type: Number, required: true, unique: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    distance: { type: Number, required: true, min: 0 },
    estimatedTime: { type: String, required: true },
    frequency: { type: String, required: true },
  },
  { timestamps: true }
);

routeSchema.index({ from: 1, to: 1 });
routeSchema.index({ distance: 1 });

module.exports = mongoose.model("Route", routeSchema);
