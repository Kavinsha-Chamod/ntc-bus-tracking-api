"use strict";
const { models } = require("../config/db");

exports.getAllTrips = async (req, res, next) => {
  try {
    const Trip = models.Trip;
    let query = {};
    if (req.query.busId) query.busId = parseInt(req.query.busId);
    if (req.query.status) query.status = req.query.status;

    const sortField = req.query.sort
      ? req.query.sort.split(":")[0]
      : "departureTime";
    const sortOrder =
      req.query.sort && req.query.sort.split(":")[1] === "desc" ? -1 : 1;
    const sort = { [sortField]: sortOrder };

    const trips = await Trip.find(query)
      .sort(sort)
      .populate("busId", "licensePlate");
    res.status(200).json(trips);
  } catch (err) {
    next(err);
  }
};

exports.createTrip = async (req, res, next) => {
  try {
    if (req.user.role === "commuter") {
      return res
        .status(403)
        .json({ error: "Insufficient permissions for creating trips" });
    }
    const Trip = models.Trip;
    const newTrip = new Trip({ ...req.body, tripId: Date.now() });
    await newTrip.validate();
    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (err) {
    next(err);
  }
};

exports.getTripById = async (req, res, next) => {
  try {
    const Trip = models.Trip;
    const trip = await Trip.findOne({
      tripId: parseInt(req.params.id),
    }).populate("busId", "licensePlate");
    if (!trip) return res.status(404).json({ error: "Trip not found" });

    const crypto = require("crypto");
    const etag = crypto
      .createHash("md5")
      .update(JSON.stringify(trip))
      .digest("hex");
    const lastModified = new Date().toUTCString();
    res.set({
      ETag: etag,
      "Last-Modified": lastModified,
      "Cache-Control": "private, max-age=60",
    });

    if (
      req.headers["if-none-match"] === etag ||
      req.headers["if-modified-since"] === lastModified
    ) {
      return res.status(304).end();
    }

    res.status(200).json(trip);
  } catch (err) {
    next(err);
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    if (req.user.role === "commuter") {
      return res.status(403).json({ error: "Read-only access for commuters" });
    }
    const Trip = models.Trip;
    const tripId = parseInt(req.params.id);
    if (req.user.role === "operator") {
      const trip = await Trip.findOne({ tripId }).populate("busId");
      if (!trip || trip.busId.operatorId !== req.user.id) {
        return res.status(403).json({ error: "Not authorized for this trip" });
      }
    }
    const updatedTrip = await Trip.findOneAndUpdate({ tripId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTrip) return res.status(404).json({ error: "Trip not found" });
    res.status(200).json(updatedTrip);
  } catch (err) {
    next(err);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admin only for deletions" });
    }
    const Trip = models.Trip;
    const trip = await Trip.findOneAndDelete({
      tripId: parseInt(req.params.id),
    });
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
